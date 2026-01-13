import { mappingDiscountPrice } from '@/lib/helper'
import getProductByCollectionQuery from '@/shopify/utils/query/get-product-by-collection-query'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'
import { shopifyFetch } from '../../fetcher'
import {
  GetAllCollectionQuery,
  GetCollectionListQuery,
} from '../../types/graphql'
import getAllCollectionQuery from '../../utils/query/get-all-collection-query'

export async function getCollections() {
  'use cache'
  cacheLife('hours')

  const data = await shopifyFetch<GetAllCollectionQuery>({
    query: getAllCollectionQuery,
  })
  const collections =
    data?.collections?.nodes.map((col) => ({
      handle: col.handle,
      title: col.title,
      description: col.description,
    })) || []

  return collections
}

export async function getCollectionProductsByHandle({
  handle,
  sortKey,
  reverse,
}: {
  handle: string
  sortKey?: string
  reverse?: boolean
}) {
  const data = await shopifyFetch<GetCollectionListQuery>({
    query: getProductByCollectionQuery,
    variables: { handle, sortKey, reverse },
  })

  const collection = data?.collection?.products?.nodes || []

  if (!collection) return notFound()

  return collection.map(mappingDiscountPrice)
}

