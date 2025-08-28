import { mappingDiscountPrice } from '@/lib/helper'
import { shopifyFetch } from '../../fetcher'
import { GetProductDetailQuery, GetProductsQuery } from '../../types/graphql'
import getProductsQuery from '../../utils/query/get-all-product-query'
import getProductDetailQuery from '../../utils/query/get-product-by-handle-query'

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<GetProductDetailQuery>({
    query: getProductDetailQuery,
    variables: { handle },
  })

  return data.product
}

export async function getAllProduct() {
  const data = await shopifyFetch<GetProductsQuery>({
    query: getProductsQuery,
  })

  const products = data.products?.nodes ?? []

  return products.map(mappingDiscountPrice)
}
