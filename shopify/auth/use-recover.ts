import { shopifyFetch } from '../fetcher'
import {
  CustomerRecoverMutation,
  CustomerResetByUrlMutation,
} from '../types/graphql'
import customerRecoverMutation from '../utils/mutation/customer-recover'
import customerResetByUrlMutation from '../utils/mutation/customer-reset-by-url'

export async function recoverAccount(email: string) {
  const data = await shopifyFetch<CustomerRecoverMutation>({
    query: customerRecoverMutation,
    variables: { email },
  })

  if (data?.customerRecover?.customerUserErrors.length) {
    return { success: false, errors: data.customerRecover?.customerUserErrors }
  }

  return { success: true }
}

export async function resetPasswordByUrl(resetUrl: string, password: string) {
  const data = await shopifyFetch<CustomerResetByUrlMutation>({
    query: customerResetByUrlMutation,
    variables: {
      resetUrl,
      password,
    },
  })

  const result = data.customerResetByUrl

  if (result?.customerUserErrors?.length) {
    return { success: false, errors: result.customerUserErrors }
  }

  return {
    success: true,
    accessToken: result?.customerAccessToken?.accessToken,
    expiresAt: result?.customerAccessToken?.expiresAt,
    customer: result?.customer,
  }
}
