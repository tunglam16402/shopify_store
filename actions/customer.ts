'use server'

import { formatPhoneE164 } from '@/lib/helper'
import { createCustomerAccessToken } from '@/shopify/auth/use-login'
import {
  updateCustomer,
  updateCustomerMetafields,
} from '@/shopify/customer/use-customer'
import { UpdateCustomerState } from '@/types/customer'
import { cookies } from 'next/headers'

export async function updateCustomerAction(
  initialState: UpdateCustomerState,
  formData: FormData
): Promise<UpdateCustomerState> {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const rawPhone = formData.get('phone') as string
  const phone =
    typeof rawPhone === 'string' && rawPhone.trim() !== ''
      ? (formatPhoneE164(rawPhone, 'VN') ?? undefined)
      : undefined
  const gender = formData.get('gender') as string
  const dateOfBirth = formData.get('dateOfBirth') as string | null

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('shopify_customer_token')?.value

  if (!accessToken) {
    return {
      success: false,
      customer: null,
      errors: [{ field: [], message: 'User not authenticated' }],
    }
  }

  const result = await updateCustomer(accessToken, {
    firstName,
    lastName,
    phone,
  })

  if (!result) {
    return {
      success: false,
      errors: [{ field: [], message: 'Update failed' }],
    }
  }

  if (result.errors.length > 0) {
    return {
      success: false,
      customer: null,
      errors: result.errors,
    }
  }

  if (result?.customer?.id && (gender || dateOfBirth)) {
    await updateCustomerMetafields(
      result?.customer?.id,
      gender ?? undefined,
      dateOfBirth ?? undefined
    )
  }

  return {
    success: true,
    customer: result.customer,
    errors: [],
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

  //  Validate input
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

  //  Verify old password
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

  //  Update password
  const result = await updateCustomer(verifyResult.accessToken, {
    password: newPassword,
  })

  if (!result || result.errors.length > 0) {
    return {
      success: false,
      errors: result?.errors ?? [
        { field: [], message: 'Password update failed' },
      ],
    }
  }

  cookieStore.delete('shopify_customer_token')

  return {
    success: true,
    requireReLogin: true,
    errors: [],
  }
}
