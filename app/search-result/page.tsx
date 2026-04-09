import SearchResult from '@/components/searchResult'
import { toURLSearchParams } from '@/lib/helper'
import { getSearchResult } from '@/shopify/api/operations/get-search'
import { buildProductFilters, parseSortSearch } from '@/shopify/helper'
import { Metadata } from 'next'

interface SearchResultPageProps {
  searchParams?: Promise<Record<string, string | undefined>>
}

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search Results',
  openGraph: {
    title: 'Search Results',
  },
}

export default async function SearchResultPage({
  searchParams,
}: SearchResultPageProps) {
  const params = (await searchParams) || {}
  const query = params.q || ''

  const { sortKey, reverse } = parseSortSearch(params.sort)
  const filters = buildProductFilters(toURLSearchParams(params))

  const {
    products,
    filters: facets,
    globalPriceFilters,
  } = await getSearchResult({
    query,
    sortKey,
    reverse,
    filters,
  })

  return (
    <SearchResult
      query={query}
      products={products}
      facets={facets}
      globalPrice={globalPriceFilters}
    />
  )
}
