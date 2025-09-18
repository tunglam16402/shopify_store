'use server'

import { deleteCustomerAccessToken } from '@/shopify/auth/use-logout'
import { cookies } from 'next/headers'

export async function logoutCustomer() {
  const cookieStore = await cookies()
  const token = cookieStore.get('shopify_customer_token')?.value
  if (token) {
    await deleteCustomerAccessToken(token)
    cookieStore.delete('shopify_customer_token')
  }
}
