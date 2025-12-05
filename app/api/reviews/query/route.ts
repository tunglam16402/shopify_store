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
    limit = 10,
  } = body

  if (!productId) {
    return NextResponse.json({ error: 'Missing productId' }, { status: 400 })
  }

  let query = supabase
    .from('reviews')
    .select('*, review_media(*)', { count: 'exact' })
    .eq('product_id', productId)

  // Filters
  // Filters
  if (filters.rating?.length) {
    query = query.in(
      'rating',
      filters.rating.map((r) => Number(r))
    ) // đảm bảo là number
  }

  if (filters.recommend?.length) {
    query = query.in('recommend', filters.recommend)
  }

  if (filters.age?.length) {
    query = query.in('age_range', filters.age)
  }

  if (search) {
    query = query.ilike('comment', `%${search}%`)
  }

  if (filters.withMedia === true) {
    query = query.filter('review_media', 'not.is', null)
  }

  //Sort
  switch (sort) {
    case 'high':
      query = query.order('rating', { ascending: false })
      break
    case 'low':
      query = query.order('rating', { ascending: true })
      break
    default:
      query = query.order('created_at', { ascending: false })
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

  const { data: allRatingsRaw } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', productId)

  const allRatings = allRatingsRaw ?? []

  const totalReviews = allRatings.length

  const avgRating =
    allRatings.reduce((sum, r) => sum + r.rating, 0) / Math.max(1, totalReviews)

  const breakdown = {
    5: allRatings.filter((r) => r.rating === 5).length,
    4: allRatings.filter((r) => r.rating === 4).length,
    3: allRatings.filter((r) => r.rating === 3).length,
    2: allRatings.filter((r) => r.rating === 2).length,
    1: allRatings.filter((r) => r.rating === 1).length,
  }

  return NextResponse.json({
    reviews,
    total: count,
    page,
    limit,
    summary: {
      avgRating,
      totalReviews,
      breakdown,
    },
  })
}
