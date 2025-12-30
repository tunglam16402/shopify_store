import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

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

export function useHasReviewed(
  reviews: { user_id: string }[] | undefined
) {
  const { customer } = useSelector((state: RootState) => state.user)

  const customerId = customer?.id
  if (!customerId || !reviews?.length) {
    return {
      myReview: undefined,
      hasReviewed: false,
    }
  }

  const myReview = reviews.find(
    (r) => r.user_id === customerId
  )

  return {
    myReview,
    hasReviewed: !!myReview,
  }
}

export function getStarDistribution(avgRating: number) {
  const fullStars = Math.floor(avgRating)
  const hasHalfStar = avgRating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return { fullStars, hasHalfStar, emptyStars }
}