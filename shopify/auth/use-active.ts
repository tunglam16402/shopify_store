import { shopifyFetch } from '../fetcher'
import { CustomerActivateByUrlMutation } from '../types/graphql'
import customerActivateByUrlMutation from '../utils/mutation/customer-access-token-create'

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
  }
}
