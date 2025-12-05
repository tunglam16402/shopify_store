/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { fetchReviews } from "@/components/products/ProductReview/services"
import { useEffect, useState } from "react"

export function useReviews(productId: string) {
  const [filters, setFilters] = useState<any>({})
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Fetch reviews
  useEffect(() => {
    let isMounted = true
    setLoading(true)

    fetchReviews({
      productId,
      filters,
      search,
      sort,
      page,
      limit
    }).then((res) => {
      if (isMounted) {
        setData(res)
        setLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [productId, filters, search, sort, page, limit])

  return {
    data,
    loading,
    filters,
    setFilters,
    search,
    setSearch,
    sort,
    setSort,
    page,
    setPage,
  }
}
