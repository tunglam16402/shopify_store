import { shopifyFetch } from '../fetcher'
import { CustomerCreateMutation } from '../types/graphql'
import customerCreateMutation from '../utils/mutation/customer-create'

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
