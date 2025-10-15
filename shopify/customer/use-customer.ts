/* eslint-disable @typescript-eslint/no-explicit-any */
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
    email?: string
    phone?: string
    password?: string
    // acceptsMarketing?: boolean
  }
) {
  try {
    const data = await shopifyFetch<CustomerUpdateMutation>({
      query: customerUpdateMutation,
      variables: { customerAccessToken: accessToken, customer },
    })

    if (!data?.customerUpdate?.customer) {
      return null
    }

    // const errors = parseShopifyErrors(data.customerUpdate?.customerUserErrors)
    // if (errors.length > 0) {
    //   return { success: false, errors }
    // }

    return data.customerUpdate
  } catch (error) {
    console.error('Error in updateCustomer:', error)
    return null
  }
}
