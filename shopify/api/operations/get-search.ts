import { mappingDiscountPrice } from '@/lib/helper'
import { shopifyFetch } from '../../fetcher'
import { GetSearchResultQuery } from '../../types/graphql'
import getSearchResultQuery from '../../utils/query/get-search-result-query'
import { isPublicShopifyProduct } from '@/shopify/helper'

export async function getSearchResult(query: string) {
  const data = await shopifyFetch<GetSearchResultQuery>({
    query: getSearchResultQuery,
    variables: { query },
  })

  const products = data.search.edges
    .map((edge) => edge.node)
    .filter(
      (
        node
      ): node is Exclude<
        GetSearchResultQuery['search']['edges'][number]['node'],
        object
      > => 'id' in node
    )
    .filter(isPublicShopifyProduct)

  return products.map(mappingDiscountPrice)
}
