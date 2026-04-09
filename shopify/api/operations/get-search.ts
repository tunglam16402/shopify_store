import { mappingDiscountPrice } from '@/lib/helper'
import { isPublicShopifyProduct } from '@/shopify/helper'
import { cacheLife } from 'next/cache'
import { shopifyFetch } from '../../fetcher'
import {
  GetSearchResultQuery,
  ProductFilter,
  SearchSortKeys,
} from '../../types/graphql'
import getSearchResultQuery from '../../utils/query/get-search-result-query'
import { splitPriceFilters } from './get-product-listing'

const VALID_SEARCH_SORT_KEYS: SearchSortKeys[] = ['RELEVANCE', 'PRICE']

function toSearchSortKey(value?: string): SearchSortKeys | undefined {
  if (!value) return undefined
  const upper = value.toUpperCase() as SearchSortKeys
  return VALID_SEARCH_SORT_KEYS.includes(upper) ? upper : undefined
}

export async function getSearchResult({
  query,
  sortKey,
  reverse,
  filters,
  first = 24,
}: {
  query: string
  sortKey?: string
  reverse?: boolean
  filters?: ProductFilter[]
  first?: number
}) {
  'use cache'
  cacheLife('hours')

  const { filters: appliedFilters, globalFilters } = splitPriceFilters(filters)

  const data = await shopifyFetch<GetSearchResultQuery>({
    query: getSearchResultQuery,
    variables: {
      query,
      sortKey: toSearchSortKey(sortKey),
      reverse,
      first,
      filters: appliedFilters,
      globalFilters,
    },
  })

  const productNodes =
    data?.searchResult?.edges
      ?.map((edge) => edge?.node)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((node): node is { id: string } & any => !!node && 'id' in node) ||
    []

  const products = productNodes
    .filter(isPublicShopifyProduct)
    .map(mappingDiscountPrice)

  return {
    products,
    filters: data?.searchResult?.productFilters || [],
    globalPriceFilters: data?.globalPriceRange?.productFilters || [],
  }
}
