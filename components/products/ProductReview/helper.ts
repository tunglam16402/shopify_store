/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/store/store'
import { Reviews } from '@/types/reviews'
import { useSelector } from 'react-redux'

export interface PaginationInfo {
  page: number
  limit: number
  total: number
}

export function useVerifiedBuyer(productId: string) {
  const { customer } = useSelector((state: RootState) => state.user)

  const orders = customer?.orders?.nodes
  if (!orders || !productId) return false

  return orders.some((order) =>
    order?.lineItems?.nodes?.some(
      (item) => item?.variant?.product?.id === productId
    )
  )
}

export function useMyReviewed(reviews: Reviews[]) {
  const { customer } = useSelector((state: RootState) => state.user)

  const customerId = customer?.id
  if (!customerId || !reviews?.length) {
    return {
      myReview: undefined,
      hasReviewed: false,
    }
  }

  const myReview = reviews.find((review) => review.user_id === customerId)

  return {
    myReview,
    hasReviewed: !!myReview,
  }
}

export function prioritizeMyReview(
  reviews: Reviews[],
  myReview?: Reviews,
  sort?: string
) {
  if (!myReview) return reviews

  if (!myReview || sort !== 'relevant') return reviews

  return [myReview, ...reviews.filter((r) => r.id !== myReview.id)]
}

export function getStarDistribution(avgRating: number) {
  const fullStars = Math.floor(avgRating)
  const hasHalfStar = avgRating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return { fullStars, hasHalfStar, emptyStars }
}

export const getPaginationRange = ({ page, limit, total }: PaginationInfo) => {
  const start = total === 0 ? 0 : (page - 1) * limit + 1
  const end = Math.min(page * limit, total)
  return { start, end }
}
