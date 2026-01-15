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

export function splitPriceFilters(filters?: ProductFilter[]) {
  if (!filters?.length) {
    return {
      filters: undefined,
      globalFilters: undefined,
    }
  }

  const globalFilters: ProductFilter[] = []
  const appliedFilters: ProductFilter[] = []

  for (const filter of filters) {
    const isPriceFilter = 'price' in filter && filter.price !== undefined

    appliedFilters.push(filter)

    if (!isPriceFilter) {
      globalFilters.push(filter)
    }
  }

  return {
    filters: appliedFilters,
    globalFilters: globalFilters.length ? globalFilters : undefined,
  }
}

export async function getCollectionProductsByHandle({
  handle,
  sortKey,
  reverse,
  filters,
  first = 24,
}: {
  handle: string
  sortKey?: string
  reverse?: boolean
  filters?: ProductFilter[]
  first?: number
}) {
  'use cache'
  cacheLife('hours')
  const { filters: appliedFilters, globalFilters } = splitPriceFilters(filters)

  const data = await shopifyFetch<GetProductByCollectionQuery>({
    query: getProductByCollectionQuery,
    variables: {
      handle,
      sortKey,
      reverse,
      first,
      filters: appliedFilters,
      globalFilters,
    },
  })

  const collection = data?.collection
  if (!collection) return notFound()

  const productsConnection = collection.products
  const globalPriceConnection = collection.globalPriceRange

  if (!productsConnection || !globalPriceConnection) {
    return notFound()
  }

  return {
    products: productsConnection.nodes.map(mappingDiscountPrice),

    // Facet dùng cho UI filter (count, disable, etc.)
    filters: productsConnection.filters,

    // Facet price range GỐC (không bị ảnh hưởng bởi price filter)
    globalPriceFilters: globalPriceConnection.filters,
  }
}

