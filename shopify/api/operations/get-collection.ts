import { mappingDiscountPrice } from '@/lib/helper'
import getProductByCollectionQuery from '@/shopify/utils/query/get-product-by-collection-query'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'
import { shopifyFetch } from '../../fetcher'
import {
  GetAllCollectionQuery,
  GetProductByCollectionQuery,
  ProductFilter,
} from '../../types/graphql'
import getAllCollectionQuery from '../../utils/query/get-all-collection-query'

// export type ProductFilter =
//   | { available: boolean }
//   | { productType: string }
//   | { productVendor: string }
//   | { tag: string }
//   | { price: { min?: number; max?: number } }
//   | { variantOption: { name: string; value: string } }

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
  filters,
}: {
  handle: string
  sortKey?: string
  reverse?: boolean
  filters?: ProductFilter[]
}) {
  const data = await shopifyFetch<GetProductByCollectionQuery>({
    query: getProductByCollectionQuery,
    variables: {
      handle,
      sortKey,
      reverse,
      filters: filters?.length ? filters : undefined,
    },
  })

  console.log('data :>> ', data)

  const productsCollection = data?.collection?.products

  if (!productsCollection) return notFound()

  return {
    products: productsCollection.nodes.map(mappingDiscountPrice),
    filters: productsCollection.filters,
  }
}
