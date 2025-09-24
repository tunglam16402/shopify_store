'use server'

import { createCustomerAccessToken } from '@/shopify/auth/use-login'
import { updateCustomer } from '@/shopify/customer/use-customer'
import { UpdateCustomerState } from '@/types/customer'
import { cookies } from 'next/headers'

export async function updateCustomerAction(
  initialState: UpdateCustomerState,
  formData: FormData
): Promise<UpdateCustomerState> {
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
      errors: [{ field: [], message: 'User not authenticated' }],
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

export async function changeCustomerPasswordAction(
  initialState: UpdateCustomerState,
  formData: FormData
): Promise<UpdateCustomerState> {
  const email = formData.get('email') as string
  const oldPassword = formData.get('oldPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  const cookieStore = await cookies()

  if (!email || !oldPassword || !newPassword || !confirmPassword) {
    return {
      success: false,
      errors: [
        {
          field: ['password'],
          message: 'All password fields are required',
        },
      ],
    }
  }

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      errors: [
        {
          field: ['confirmPassword'],
          message: 'Passwords do not match',
        },
      ],
    }
  }

  const verifyResult = await createCustomerAccessToken({
    email,
    password: oldPassword,
  })

  if (!verifyResult.success || !verifyResult.accessToken) {
    return {
      success: false,
      errors: verifyResult.errors ?? [
        {
          field: ['oldPassword'],
          message: 'Old password is incorrect',
        },
      ],
    }
  }
  const result = await updateCustomer(verifyResult.accessToken, {
    password: newPassword,
  })

  if (!result) {
    return {
      success: false,
      errors: [{ field: [], message: 'Password update failed' }],
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
    success: result.customerUserErrors?.length === 0,
    customer: result.customer,
    accessToken: result.customerAccessToken,
    errors:
      result.customerUserErrors?.map((err) => ({
        field: err.field || [],
        message: err.message,
      })) ?? [],
  }
}
