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
import { getProductListing, splitPriceFilters } from './get-product-listing'

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
  after,
  first = 40,
}: {
  handle: string
  sortKey?: string
  reverse?: boolean
  filters?: ProductFilter[]
  after?: string | null
  first?: number
}) {
  'use cache'
  cacheLife('hours')
  const { filters: appliedFilters, globalFilters } = splitPriceFilters(filters)

  const result = await getProductListing<
    GetProductByCollectionQuery,
    {
      handle: string
      sortKey?: string
      reverse?: boolean
      after?: string | null
      filters?: ProductFilter[]
      globalFilters?: ProductFilter[]
      first: number
    }
  >({
    query: getProductByCollectionQuery,
    variables: {
      handle,
      sortKey,
      reverse,
      first,
      after,
      filters: appliedFilters,
      globalFilters,
    },
    extract: (data) => {
      const collection = data?.collection

      if (!collection) {
        return {
          productsConnection: null,
          globalPriceConnection: null,
          notFound: true,
        }
      }

      return {
        productsConnection: collection.products,
        globalPriceConnection: collection.globalPriceRange,
      }
    },
  })

  if (result.notFound) {
    return notFound()
  }

  return {
    products: result.products,
    filters: result.filters,
    globalPriceFilters: result.globalPriceFilters,
    pageInfo: result.pageInfo,
  }
}
