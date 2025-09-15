'use server'
import { createCustomerAccessToken } from '@/shopify/auth/use-login'
import { unstable_noStore } from 'next/cache'

export async function loginCustomer(formData: FormData) {
  unstable_noStore()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const result = await createCustomerAccessToken({
    email,
    password,
  })

  console.log('result :>> ', result)

  return result
}
