import { shopifyFetch } from '@/shopify/fetcher'
import { GetShopPoliciesQuery } from '@/shopify/types/graphql'
import getShopPoliciesQuery from '@/shopify/utils/query/get-shop-policies-query'
import { cacheLife } from 'next/cache'

export async function getShopPolicies() {
  'use cache'
  cacheLife('hours')

  const data = await shopifyFetch<GetShopPoliciesQuery>({
    query: getShopPoliciesQuery,
  })

  return data
}

