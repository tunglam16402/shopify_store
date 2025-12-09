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
