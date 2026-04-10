'use client'

import useSWR from 'swr'
import { fetchReviews } from '@/components/products/ProductReview/services'
import { useState } from 'react'
import { ReviewFilter } from '@/components/products/ProductReview/type'

export function useReviews(productId: string) {
  const [filters, setFilters] = useState<ReviewFilter>({})
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('relevant')
  const [page, setPage] = useState(1)
  const limit = 8

  function normalizeFilters(filters: ReviewFilter): ReviewFilter {
    const entries = Object.entries(filters)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return [key, [...value].sort()]
        }
        return [key, value]
      })

    return Object.fromEntries(entries) as ReviewFilter
  }

  const normalizedFilters = normalizeFilters(filters)

  const key = [
    'reviews',
    productId,
    JSON.stringify(normalizedFilters),
    search,
    sort,
    page,
    limit,
  ]

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () =>
      fetchReviews({
        productId,
        filters,
        search,
        sort,
        page,
        limit,
      }),
    { revalidateOnFocus: false, dedupingInterval: 1000 * 60 * 60 }
  )

  return {
    data: data ?? [],
    isLoading,
    error,
    filters,
    setFilters,
    search,
    setSearch,
    sort,
    setSort,
    page,
    setPage,
    mutate,
  }
}

