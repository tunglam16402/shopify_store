'use server'

import { createCustomer } from '@/shopify/auth/use-signup'
import { RegisterState } from '@/types/auth'

export async function registerCustomer(
  initialState: RegisterState, 
  formData: FormData
): Promise<RegisterState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const phone = formData.get('phone') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  if (!email || !password) {
    return {
      success: false,
      customer: null,
      errors: [{ field: [], message: 'Email and password are required' }],
    }
  }

  const result = await createCustomer({
    email,
    password,
    phone,
    firstName,
    lastName,
  })

  return {
    success: result.success,
    customer: result.customer ?? null,
    errors:
      result.errors?.map((err) => ({
        field: err.field || [],
        message: err.message,
      })) ?? [],
  }
}
