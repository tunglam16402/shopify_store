import { shopifyFetch } from '../fetcher'
import { GetCustomerQuery } from '../types/graphql'
import getCustomerQuery from '../utils/query/get-customer-query'

export async function getCustomer(accessToken: string) {
  console.log('Getting customer with token:', accessToken)

  try {
    const data = await shopifyFetch<GetCustomerQuery>({
      query: getCustomerQuery,
      variables: { customerAccessToken: accessToken },
    })

    console.log('Full API response:', JSON.stringify(data, null, 2))

    // Check if customer exists
    // if (!data.customer) {
    //   console.error('Customer is null in response')
    //   console.log('This usually means:')
    //   console.log('1. Access token is invalid/expired')
    //   console.log('2. Customer does not exist')
    //   console.log('3. Token needs time to propagate in Shopify system')
    //   return null
    // }

    return data.customer
  } catch (error) {
    console.error('Error in getCustomer:', error)
    return null
  }
}
