'use server'

import { updateCustomer } from '@/shopify/customer/use-customer'
import { UpdateCustomerState } from '@/types/customer'
import { cookies } from 'next/headers'

export async function updateCustomerAction(
  initialState: UpdateCustomerState,
  formData: FormData
) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
//   const acceptsMarketing = formData.get('acceptsMarketing') === 'on'

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('shopify_customer_token')?.value

  if (!accessToken) {
    return {
      success: false,
      errors: [{ message: 'User not authenticated' }],
    }
  }

  const result = await updateCustomer(accessToken, {
    firstName,
    lastName,
    email,
    phone,
    // acceptsMarketing,
  })

  if (!result) {
    return {
      success: false,
      errors: [{ field: [], message: 'Update failed' }],
    }
  }

  if (result.customerAccessToken) {
    cookieStore.set(
      'shopify_customer_token',
      result.customerAccessToken.accessToken,
      {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      }
    )
  }

  return {
    success: true,
    customer: result.customer,
    accessToken: result.customerAccessToken,
    errors:
      result.customerUserErrors?.map((err) => ({
        field: err.field || [],
        message: err.message,
      })) ?? [],
  }
}
