'use server'

import { normalizeAddress } from '@/lib/helper'
import {
  createCustomerAddress,
  updateCustomerAddress,
} from '@/shopify/customer-address/use-address'
import { updateCustomer } from '@/shopify/customer/use-customer'
import { UpdateCustomerState } from '@/types/customer'
import {
  CreateAddressState,
  UpdateAddressState,
} from '@/types/customer/address'
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

export async function createCustomerAddressAction(
  initialState: CreateAddressState,
  formData: FormData
): Promise<CreateAddressState> {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const company = formData.get('company') as string
  const phone = formData.get('phone') as string
  const address1 = formData.get('address1') as string
  const address2 = formData.get('address2') as string
  const province = formData.get('province') as string
  const city = formData.get('city') as string
  const country = formData.get('country') as string
  const zip = formData.get('zip') as string

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('shopify_customer_token')?.value

  if (!accessToken) {
    return {
      success: false,
      errors: [{ field: [], message: 'User not authenticated' }],
    }
  }

  console.log('accessToken :>> ', accessToken)

  const result = await createCustomerAddress(accessToken, {
    firstName,
    lastName,
    company,
    phone,
    address1,
    address2,
    province,
    city,
    country,
    zip,
  })

  console.log('result :>> ', result)

  if (!result || !result.data?.customerAddress) {
    return {
      success: false,
      errors: [{ field: [], message: 'Create address failed' }],
    }
  }

  return {
    success: true,
    address: normalizeAddress(result.data.customerAddress),
    errors:
      result.data.customerUserErrors?.map((err) => ({
        field: err.field || [],
        message: err.message,
      })) ?? [],
  }
}

export async function updateCustomerAddressAction(
  initialState: UpdateAddressState,
  formData: FormData
): Promise<UpdateAddressState> {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const company = formData.get('company') as string
  const phone = formData.get('phone') as string
  const address1 = formData.get('address1') as string
  const address2 = formData.get('address2') as string
  const province = formData.get('province') as string
  const city = formData.get('city') as string
  const country = formData.get('country') as string
  const zip = formData.get('zip') as string

  const id = formData.get('id') as string

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('shopify_customer_token')?.value

  if (!accessToken) {
    return {
      success: false,
      errors: [{ field: [], message: 'User not authenticated' }],
    }
  }

  console.log('accessToken :>> ', accessToken)

  const result = await updateCustomerAddress(accessToken, id, {
    firstName,
    lastName,
    company,
    phone,
    address1,
    address2,
    province,
    city,
    country,
    zip,
  })

  console.log('result :>> ', result)

  if (!result || !result.data) {
    return {
      success: false,
      errors: [{ field: [], message: 'Create address failed' }],
    }
  }

  return {
    success: true,
    address: normalizeAddress(result.data.customerAddress),
    errors:
      result.data.customerUserErrors?.map((err) => ({
        field: err.field || [],
        message: err.message,
      })) ?? [],
  }
}
