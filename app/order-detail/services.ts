import { getCustomer } from '@/shopify/customer/use-customer'
import { cookies } from 'next/headers'

export const getUserOrders = async () => {
  const cookieStore = await cookies()
  const customerToken = cookieStore.get('shopify_customer_token')?.value
  if (!customerToken) return null

  const customer = await getCustomer(customerToken)
  if (!customer) return null

  const orders = customer?.orders?.nodes
  return orders
}
