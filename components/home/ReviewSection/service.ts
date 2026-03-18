import { getProductsByIds } from '@/shopify/api/operations/get-product'
import { createPublicClient } from '@/utils/supabase/public'
import { HomepageReview, HomepageReviewProduct, ReviewRow } from './type'

export async function getHomepageReviews() {
  const supabase = createPublicClient()

  const [reviewsRes, countRes] = await Promise.all([
    supabase
      .from('reviews')
      .select(
        `
        id,
        product_id,
        username,
        rating,
        headline,
        comment,
        created_at,
        vote_up
      `
      )
      .eq('rating', 5)
      .order('vote_up', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(30),

    supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('rating', 5),
  ])

  if (reviewsRes.error) {
    throw new Error(reviewsRes.error.message)
  }

  if (countRes.error) {
    throw new Error(countRes.error.message)
  }

  const reviewRows = (reviewsRes.data ?? []) as ReviewRow[]

  const reviews: HomepageReview[] = reviewRows.map((review) => ({
    id: review.id,
    productId: review.product_id,
    username: review.username,
    rating: review.rating,
    headline: review.headline,
    comment: review.comment,
    createdAt: review.created_at,
    voteUp: review.vote_up,
  }))

  return {
    reviews,
    totalFiveStarReviews: countRes.count ?? 0,
  }
}

export async function getHomepageReviewSectionData() {
  const data = await getHomepageReviews()

  const productIds = Array.from(
    new Set(data.reviews.map((review) => review.productId).filter(Boolean))
  )

  const products = productIds.length ? await getProductsByIds(productIds) : []

  const productMap = new Map<string, HomepageReviewProduct>(
    products.map((product) => [
      product.id,
      {
        id: product.id,
        title: product.title,
        handle: product.handle,
        image: product.images?.[0]
          ? {
              url: product.images[0].url,
              altText: product.images[0].altText ?? product.title,
            }
          : undefined,
      },
    ])
  )

  return {
    totalFiveStarReviews: data.totalFiveStarReviews,
    reviews: data.reviews.map((review) => ({
      ...review,
      product: productMap.get(review.productId),
    })),
  }
}
