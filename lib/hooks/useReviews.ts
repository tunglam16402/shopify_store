/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { fetchReviews } from "@/components/products/ProductReview/services"
import { useEffect, useState } from "react"

export function useReviews(productId: string) {
  const [filters, setFilters] = useState<any>({})
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")
  const [page, setPage] = useState(1)
  const [limit] = useState(8)

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    let isMounted = true

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
      }
    })

    return () => {
      isMounted = false
    }
  }, [productId, filters, search, sort, page, limit])

  return {
    data,
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
