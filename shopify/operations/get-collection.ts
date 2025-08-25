import getProductByCollectionQuery from '@/shopify/utils/query/get-product-by-collection-query'
import { shopifyFetch } from '../fetcher'
import { GetAllCollectionQuery, GetCollectionListQuery } from '../types/graphql'
import getAllCollectionQuery from '../utils/query/get-all-collection-query'
import { mappingDiscountPrice } from '@/lib/helper'
import { notFound } from 'next/navigation'

export async function getCollections() {
  const data = await shopifyFetch<GetAllCollectionQuery>({
    query: getAllCollectionQuery,
  })
  const collections =
    data?.collections?.nodes.map((col) => ({
      handle: col.handle,
      title: col.title,
    })) || []

  return collections
}

export async function getCollectionProductsByHandle(handle: string) {
  const data = await shopifyFetch<GetCollectionListQuery>({
    query: getProductByCollectionQuery,
    variables: { handle },
  })

  const collection = data?.collection?.products?.nodes || []

  if (!collection) return notFound()

  return collection.map(mappingDiscountPrice)
}
