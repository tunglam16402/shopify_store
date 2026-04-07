'use client'

import { useState, useMemo } from 'react'
import { useDebounceValue } from '@/shopify/hooks/useDebounce'

interface UseSearchOptions<T> {
  data: T[]
  keys: (item: T) => string | string[]
}

interface UseSearchReturn<T> {
  query: string
  setQuery: (value: string) => void
  results: T[]
}

export function useSearch<T>({
  data,
  keys,
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data
    return data.filter((item) => {
      const fields = keys(item)
      const values = Array.isArray(fields) ? fields : [fields]
      return values.some((v) => v.toLowerCase().includes(q))
    })
  }, [data, query, keys])

  return { query, setQuery, results }
}
