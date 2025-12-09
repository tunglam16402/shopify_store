import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const body = await req.json()

  const {
    productId,
    filters = {},
    search = '',
    sort = 'newest',
    page = 1,
    limit = 8,
  } = body

  if (!productId) {
    return NextResponse.json({ error: 'Missing productId' }, { status: 400 })
  }

  let query = supabase
    .from('reviews')
    .select('*, review_media(*)', { count: 'exact' })
    .eq('product_id', productId)

  //search
  if (search) {
    const terms = search.trim().split(/\s+/).filter(Boolean)

    for (const t of terms) {
      const keyword = `%${t}%`
      query = query.or(`comment.ilike.${keyword},headline.ilike.${keyword}`)
    }
  }

  // Filters
  if (filters.rating?.length) {
    query = query.in(
      'rating',
      filters.rating.map((r: number) => Number(r))
    )
  }

  if (filters.recommend?.length) {
    query = query.in('recommend', filters.recommend)
  }

  if (filters.age?.length) {
    query = query.in('age_range', filters.age)
  }

  if (filters.withMedia === true) {
    query = query.filter('review_media', 'not.is', null)
  }

  //Sort
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
    default:
      query = query
        .order('rating', { ascending: false })
        .order('vote_up', { ascending: false })
  }

  //pagination
  const from = (page - 1) * limit
  const to = from + limit - 1

  query = query.range(from, to)

  // Fetch reviews
  const { data: reviews, count, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: allRatings } = await supabase
    .from('reviews')
    .select('rating, quality, value')
    .eq('product_id', productId)

  if (!allRatings) return null

  const totalReviews = allRatings.length

  const calcAvg = (key: 'rating' | 'quality' | 'value') =>
    allRatings.reduce((sum, r) => sum + (r[key] ?? 0), 0) /
    Math.max(1, totalReviews)

  const breakdown = [5, 4, 3, 2, 1].reduce(
    (acc, star) => ({
      ...acc,
      [star]: allRatings.filter((r) => r.rating === star).length,
    }),
    {} as Record<1 | 2 | 3 | 4 | 5, number>
  )

  return NextResponse.json({
    reviews,
    total: count,
    page,
    limit,
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
}
