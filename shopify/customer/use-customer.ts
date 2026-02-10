import {
  mapCustomer,
  parseShopifyCustomersErrors,
  parseShopifyUsersErrors,
} from '@/lib/helper'
import { adminFetch } from '../admin-fetcher'
import { shopifyFetch } from '../fetcher'
import { CustomerUpdateMutation, GetCustomerQuery } from '../types/graphql'
import { customerUpdateMutation } from '../utils/mutation'
import getCustomerQuery from '../utils/query/get-customer-query'
import customerMetafielsMutation from '../utils/mutation/customer-metafield-update'

export async function getCustomer(accessToken: string) {
  try {
    const data = await shopifyFetch<GetCustomerQuery>({
      query: getCustomerQuery,
      variables: { customerAccessToken: accessToken },
    })

    if (!data?.customer) {
      return null
    }

    return mapCustomer(data?.customer)
  } catch (error) {
    console.error('Error in getCustomer:', error)
    return null
  }
}

export async function updateCustomer(
  accessToken: string,
  customer: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    password?: string
  }
) {
  try {
    const data = await shopifyFetch<CustomerUpdateMutation>({
      query: customerUpdateMutation,
      variables: {
        customerAccessToken: accessToken,
        customer,
      },
    })

    const result = data?.customerUpdate
    if (!result) return null

    const errors = parseShopifyCustomersErrors(result)

    return {
      customer: result.customer,
      errors,
    }
  } catch (error) {
    console.error('Error in updateCustomer:', error)
    return null
  }
}

export async function getCustomerId(accessToken: string): Promise<string> {
  const data = await shopifyFetch<{
    customer: { id: string } | null
  }>({
    query: `
      query ($token: String!) {
        customer(customerAccessToken: $token) {
          id
        }
      }
    `,
    variables: { token: accessToken },
  })

  if (!data.customer) {
    throw new Error('Invalid customer token')
  }

  return data.customer.id
}

export async function updateCustomerMetafields(
  customerId: string,
  gender?: string,
  dateOfBirth?: string
) {
  const metafields = []

  if (gender) {
    metafields.push({
      ownerId: customerId,
      namespace: 'custom',
      key: 'gender',
      type: 'single_line_text_field',
      value: gender,
    })
  }

  if (dateOfBirth) {
    metafields.push({
      ownerId: customerId,
      namespace: 'custom',
      key: 'date_of_birth',
      type: 'date',
      value: dateOfBirth,
    })
  }

  if (metafields.length === 0) return

  const data = await adminFetch<{
    metafieldsSet: {
      metafields: {
        key: string
        namespace: string
        value: string
      }[]
      userErrors: {
        field: string[]
        message: string
        code?: string
      }[]
    }
  }>({
    query: customerMetafielsMutation,
    variables: { metafields },
  })

  const errors = parseShopifyUsersErrors(data.metafieldsSet)

  if (errors.length > 0) {
    return { success: false, errors }
  }

  return data.metafieldsSet.metafields
}
