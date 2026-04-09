/* eslint-disable @typescript-eslint/no-explicit-any */
import { mappingDiscountPrice } from '@/lib/helper'
import { cacheLife } from 'next/cache'
import { ProductFilter } from '../../types/graphql'
import { shopifyFetch } from '../../fetcher'

type ListingConnection = {
  nodes: any[]
  filters: any[]
}

type PriceConnection = {
  filters: any[]
}

type GetProductListingParams<TData, TVariables> = {
  query: string
  variables: TVariables
  extract: (data: TData) => {
    productsConnection: ListingConnection | null | undefined
    globalPriceConnection: PriceConnection | null | undefined
    notFound?: boolean
  }
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

async function fetchProductListingData<TData, TVariables extends Record<string, any> | undefined>(
  query: string,
  variables: TVariables
): Promise<TData> {
  'use cache'
  cacheLife('hours')

  return shopifyFetch<TData>({ query, variables })
}

export async function getProductListing<TData, TVariables extends Record<string, any> | undefined>({
  query,
  variables,
  extract,
}: GetProductListingParams<TData, TVariables>) {
  const data = await fetchProductListingData<TData, TVariables>(query, variables)

  const { productsConnection, globalPriceConnection, notFound } = extract(data)

  return {
    notFound: !!notFound,
    products: (productsConnection?.nodes || []).map(mappingDiscountPrice),
    filters: productsConnection?.filters || [],
    globalPriceFilters: globalPriceConnection?.filters || [],
  }
}