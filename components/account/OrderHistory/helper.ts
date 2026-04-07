import { Order } from '@/types/customer/order'

export type OrderSortValue =
  | 'date-desc'
  | 'date-asc'
  | 'status-asc'
  | 'status-desc'

export const sortOrders = (orders: Order[], sort: OrderSortValue): Order[] => {
  const sorted = [...orders]

  switch (sort) {
    case 'date-desc':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.processedAt).getTime()
        const dateB = new Date(b.processedAt).getTime()
        return dateB - dateA
      })

    case 'date-asc':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.processedAt).getTime()
        const dateB = new Date(b.processedAt).getTime()
        return dateA - dateB
      })

    case 'status-asc':
      return sorted.sort((a, b) => {
        const statusA = (
          a.fulfillmentStatus ||
          a.financialStatus ||
          ''
        ).toLowerCase()

        const statusB = (
          b.fulfillmentStatus ||
          b.financialStatus ||
          ''
        ).toLowerCase()

        return statusA.localeCompare(statusB)
      })

    case 'status-desc':
      return sorted.sort((a, b) => {
        const statusA = (
          a.fulfillmentStatus ||
          a.financialStatus ||
          ''
        ).toLowerCase()

        const statusB = (
          b.fulfillmentStatus ||
          b.financialStatus ||
          ''
        ).toLowerCase()

        return statusB.localeCompare(statusA)
      })

    default:
      return sorted
  }
}
