'use client'

import useSWR from 'swr'
import { fetchReviews } from '@/components/products/ProductReview/services'
import { useState } from 'react'
import { ReviewFilter } from '@/components/products/ProductReview/type'

export function useReviews(productId: string) {
  const [filters, setFilters] = useState<ReviewFilter>({})
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('revelant')
  const [page, setPage] = useState(1)
  const limit = 8

  const key = ['reviews', productId, filters, search, sort, page, limit]

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
    data,
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
