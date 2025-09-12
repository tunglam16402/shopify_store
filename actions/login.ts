'use server'
import { createCustomerAccessToken } from '@/shopify/auth/use-login'

export async function loginCustomer(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const result = await createCustomerAccessToken({
    email,
    password,
  })

  return result
}
