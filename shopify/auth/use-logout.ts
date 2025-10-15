import { shopifyFetch } from '../fetcher'
import { CustomerAccessTokenDeleteMutation } from '../types/graphql'
import customerAccessTokenDeleteMutation from '../utils/mutation/customer-access-token-delete'

export async function deleteCustomerAccessToken(accessToken: string) {
  try {
    if (!accessToken) throw new Error('No access token provided')

    const data = await shopifyFetch<CustomerAccessTokenDeleteMutation>({
      query: customerAccessTokenDeleteMutation,
      variables: { customerAccessToken: accessToken },
    })

    const errors = data.customerAccessTokenDelete?.userErrors
    if (errors?.length) {
      console.error('Logout errors:', errors)
      return { success: false, errors }
    }

    return { success: true }
  } catch (err) {
    console.error('deleteCustomerAccessToken FAILED:', err)
    throw err
  }
}
