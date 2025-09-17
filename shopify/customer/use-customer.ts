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

    if (!data?.customer) {
      return null
    }

    return data.customer
  } catch (error) {
    console.error('Error in getCustomer:', error)
    return null
  }
}
