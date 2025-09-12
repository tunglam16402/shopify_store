import { shopifyFetch } from '../fetcher'
import { CustomerCreateMutation } from '../types/graphql'
import customerCreateMutation from '../utils/mutation/customer-create'
import { CustomerActivateByUrlMutation } from '../types/graphql'
import customerActivateByUrlMutation from '../utils/mutation/customer-activate-by-url'

export async function createCustomer(input: {
  firstName?: string
  lastName?: string
  email: string
  phone: string
  password: string
}) {
  const data = await shopifyFetch<CustomerCreateMutation>({
    query: customerCreateMutation,
    variables: { input },
  })

  if (data?.customerCreate?.customerUserErrors?.length) {
    console.error(
      'Customer create errors:',
      data.customerCreate.customerUserErrors
    )
    return { success: false, errors: data.customerCreate.customerUserErrors }
  }

  return { success: true, customer: data.customerCreate?.customer }
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

  if (data?.customerActivateByUrl?.customerUserErrors?.length) {
    return {
      success: false,
      errors: data.customerActivateByUrl.customerUserErrors,
    }
  }

  return {
    success: true,
    customer: data.customerActivateByUrl?.customer,
    accessToken: data?.customerActivateByUrl?.customerAccessToken?.accessToken,
    expiresAt: data?.customerActivateByUrl?.customerAccessToken?.expiresAt,
  }
}
