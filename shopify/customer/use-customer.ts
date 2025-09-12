import { shopifyFetch } from '../fetcher'
import { GetCustomerQuery } from '../types/graphql'
import getCustomerQuery from '../utils/query/get-customer-query'

export async function getCustomer(accessToken: string) {
  const data = await shopifyFetch<GetCustomerQuery>({
    
    query: getCustomerQuery,
    variables: { customerAccessToken: accessToken },
  })
  console.log('data: ', data);

  return data.customer
}
