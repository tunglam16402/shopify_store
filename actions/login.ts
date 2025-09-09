'use server'

import { cookies } from 'next/headers'
import { createCustomerAccessToken } from '@/shopify/auth/use-login'

export async function loginCustomer(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const result = await createCustomerAccessToken({ email, password })

  if (result.success && result.accessToken) {
    // Lưu token vào cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'customerAccessToken',
      value: result.accessToken,
      expires: new Date(result.expiresAt), // Shopify trả về ISO string
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })
  }

  return result
}
