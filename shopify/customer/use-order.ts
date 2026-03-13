import { adminFetch } from '../admin-fetcher'
import getShippingMehtodsQuery from '../utils/get-order-shipping-methods'

export async function getOrderShippingMethod(id: string) {
  const data = await adminFetch<{
    order: {
      shippingLines: {
        edges: {
          node: {
            title: string | null
          }
        }[]
      }
    } | null
  }>({
    query: getShippingMehtodsQuery,
    variables: { id },
  })

  if (!data?.order) return []

  return data.order.shippingLines.edges
    .map((edge) => edge.node.title)
    .filter(Boolean)
}
