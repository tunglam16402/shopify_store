import { shopifyFetch } from '../fetcher'
import { CustomerCreateMutation } from '../types/graphql'
import customerCreateMutation from '../utils/mutation/customer-create'
import { CustomerActivateByUrlMutation } from '../types/graphql'
import customerActivateByUrlMutation from '../utils/mutation/customer-activate-by-url'
import { parseShopifyCustomersErrors } from '@/lib/helper'

export async function createCustomer(input: {
  firstName?: string
  lastName?: string
  phone?: string
  email: string
  password: string
}) {
  const data = await shopifyFetch<CustomerCreateMutation>({
    query: customerCreateMutation,
    variables: { input },
  })

  const result = data.customerCreate

  const errors = parseShopifyCustomersErrors(result)

  if (errors.length > 0) {
    return { success: false, errors }
  }

  return { success: true, customer: result?.customer }
}

export async function activateCustomer(input: {
  activationUrl: string
  password: string
}) {
  const data = await shopifyFetch<CustomerActivateByUrlMutation>({
    query: customerActivateByUrlMutation,
    variables: {
      activationUrl: input.activationUrl,
      password: input.password,
    },
  })

  const result = data.customerActivateByUrl

  const errors = parseShopifyCustomersErrors(result)

  if (errors.length > 0) {
    return { success: false, errors }
  }

  return {
    success: true,
    customer: result?.customer,
    accessToken: result?.customerAccessToken?.accessToken,
    expiresAt: result?.customerAccessToken?.expiresAt,
  }
}
