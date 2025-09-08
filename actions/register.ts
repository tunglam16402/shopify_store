'use server'
import { createCustomer } from '@/shopify/auth/use-signup'

export async function registerCustomer(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const phone = formData.get('phone') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  const result = await createCustomer({
    email,
    password,
    phone,
    firstName,
    lastName,
  })

  return result
}
