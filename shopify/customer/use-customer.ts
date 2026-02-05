import { parseShopifyCustomersErrors } from '@/lib/helper'
import { shopifyFetch } from '../fetcher'
import { CustomerUpdateMutation, GetCustomerQuery } from '../types/graphql'
import { customerUpdateMutation } from '../utils/mutation'
import getCustomerQuery from '../utils/query/get-customer-query'

export async function getCustomer(accessToken: string) {
  try {
    const data = await shopifyFetch<GetCustomerQuery>({
      query: getCustomerQuery,
      variables: { customerAccessToken: accessToken },
    })

    if (!data?.customer) {
      return null
    }

    return data.customer
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
