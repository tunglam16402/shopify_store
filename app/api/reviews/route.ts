import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Validate request body
    let body
    try {
      body = await req.json()
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const {
      productId,
      filters = {},
      search = '',
      sort = 'relevant',
      page = 1,
      limit = 8,
    } = body

    // Validate productId
    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 })
    }

    // Validate pagination params
    const validPage = Math.max(1, Number(page) || 1)
    const validLimit = Math.min(100, Math.max(1, Number(limit) || 8))

    let query = supabase
      .from('reviews')
      .select('*, review_media(*)', { count: 'exact' })
      .eq('product_id', productId)

    // Search
    if (search && typeof search === 'string') {
      const terms = search.trim().split(/\s+/).filter(Boolean)

      if (terms.length > 0) {
        for (const t of terms) {
          const keyword = `%${t}%`
          query = query.or(`comment.ilike.${keyword},headline.ilike.${keyword}`)
        }
      }
    }

    // Filters
    if (
      filters.rating &&
      Array.isArray(filters.rating) &&
      filters.rating.length > 0
    ) {
      const validRatings = filters.rating
        .map((r: number) => Number(r))
        .filter((r: number) => !isNaN(r) && r >= 1 && r <= 5)

      if (validRatings.length > 0) {
        query = query.in('rating', validRatings)
      }
    }

    if (
      filters.recommend &&
      Array.isArray(filters.recommend) &&
      filters.recommend.length > 0
    ) {
      query = query.in('recommend', filters.recommend)
    }

    if (filters.age && Array.isArray(filters.age) && filters.age.length > 0) {
      query = query.in('age_range', filters.age)
    }

    if (filters.withMedia === true) {
      query = query.filter('review_media', 'not.is', null)
    }

    // Sort
    switch (sort) {
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'high':
        query = query.order('rating', { ascending: false })
        break
      case 'low':
        query = query.order('rating', { ascending: true })
        break
      case 'helpful':
        query = query.order('vote_up', { ascending: false })
        break
      default:
        query = query
          .order('rating', { ascending: false })
          .order('vote_up', { ascending: false })
    }

    // Pagination
    const from = (validPage - 1) * validLimit
    const to = from + validLimit - 1

    query = query.range(from, to)

    // Fetch reviews
    const { data: reviews, count, error } = await query

    if (error) {
      console.error('Error fetching reviews:', error)
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      )
    }

    const { data: allRatings, error: ratingsError } = await supabase
      .from('reviews')
      .select('rating, quality, value')
      .eq('product_id', productId)

    if (ratingsError) {
      console.error('Error fetching ratings:', ratingsError)
      return NextResponse.json(
        { error: 'Failed to load ratings' },
        { status: 500 }
      )
    }

    const safeAllRatings = allRatings || []
    const totalReviews = safeAllRatings.length

    const calcAvg = (key: 'rating' | 'quality' | 'value'): number => {
      const valid = safeAllRatings.filter(
        (r) => r?.[key] !== null && r?.[key] !== undefined && !isNaN(r[key])
      )

      if (valid.length === 0) return 0

      const sum = valid.reduce((total, r) => total + (r[key] || 0), 0)
      return parseFloat((sum / valid.length).toFixed(2))
    }

    const breakdown = [5, 4, 3, 2, 1].reduce(
      (acc, star) => ({
        ...acc,
        [star]: safeAllRatings.filter((r) => r?.rating === star).length,
      }),
      {} as Record<1 | 2 | 3 | 4 | 5, number>
    )

    return NextResponse.json({
      reviews: reviews || [],
      total: count ?? 0,
      page: validPage,
      limit: validLimit,
      summary: {
        avgRating: calcAvg('rating'),
        totalReviews,
        breakdown,
      },
      performance: {
        avgQuality: calcAvg('quality'),
        avgValue: calcAvg('value'),
      },
    })
  } catch (error) {
    console.error('Unexpected error in reviews API:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
