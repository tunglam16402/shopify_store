'use client'

import useSWRInfinite from 'swr/infinite'
import { getProducts } from '@/shopify/api/operations/get-product'

const LIMIT = 40

type ProductPage = Awaited<ReturnType<typeof getProducts>>

export function useInfiniteProducts(initialData?: ProductPage) {
  const getKey = (pageIndex: number, previousPageData: ProductPage | null) => {
    if (previousPageData && !previousPageData.pageInfo.hasNextPage) return null
    if (pageIndex === 0) return ['products', null]
    return ['products', previousPageData!.pageInfo.endCursor]
  }

  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    ([_, after]) => getProducts({ first: LIMIT, after }),
    {
      revalidateFirstPage: false,
      fallbackData: initialData ? [initialData] : undefined,
    }
  )

  const products = data ? data.flatMap((page) => page.products) : []
  const hasNextPage = data?.[data.length - 1]?.pageInfo?.hasNextPage ?? false
  const isLoadingMore = isValidating && !!data

  return {
    products,
    loadMore: () => setSize(size + 1),
    hasNextPage,
    isLoading,
    isLoadingMore,
  }
}
