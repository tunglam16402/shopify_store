'use client'

import { fetchReviewSummary } from '@/components/products/ProductReview/services'
import useSWR from 'swr'

export function useReviewSummary(productIds: string[]) {
  const { data, isLoading, error } = useSWR(
    productIds.length ? ['reviews-summary', productIds] : null,
    () => fetchReviewSummary(productIds),
    {
      dedupingInterval: 1000 * 60 * 60,
      revalidateOnFocus: false,
    }
  )

  return {
    summaryMap: data ?? {},
    isLoading,
    error,
  }
}
