import { mappingDiscountPrice } from '@/lib/helper'
import getProductByCollectionQuery from '@/shopify/utils/query/get-product-by-collection-query'
import { notFound } from 'next/navigation'
import { shopifyFetch } from '../../fetcher'
import {
  GetAllCollectionQuery,
  GetCollectionListQuery,
} from '../../types/graphql'
import getAllCollectionQuery from '../../utils/query/get-all-collection-query'
import { GetCollectionWithSortQuery } from './../../types/graphql'
import getCollectionWithSortQuery from '@/shopify/utils/query/get-sorted-product-query'

export async function getCollections() {
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

export async function getCollectionProductsByHandle(handle: string) {
  const data = await shopifyFetch<GetCollectionListQuery>({
    query: getProductByCollectionQuery,
    variables: { handle },
  })

  const collection = data?.collection?.products?.nodes || []

  if (!collection) return notFound()

  return collection.map(mappingDiscountPrice)
}

export async function getSortedCollectionProducts({
  handle,
  sortKey,
  reverse,
}: {
  handle: string
  sortKey?: string
  reverse?: boolean
}) {
  const data = await shopifyFetch<GetCollectionWithSortQuery>({
    query: getCollectionWithSortQuery,
    variables: { handle, sortKey, reverse },
  })

  console.log('data :>> ', data)

  return data.collection
}
