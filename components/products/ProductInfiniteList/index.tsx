'use client'

import { useEffect, useRef, useCallback } from 'react'
import { ProductList } from '@/components/products'
import { useInfiniteProducts } from '@/lib/hooks/useInfinityScroll'
import Loading from '@/components/common/Loading'
import ProductListSkeleton from '@/components/collection/CollectionSkeleton/ProductListSkeleton'
import { getProducts } from '@/shopify/api/operations/get-product'
import { TileBanner } from '@/components/collection/Banner'

type Props = {
  initialData?: Awaited<ReturnType<typeof getProducts>>
  tiles?: TileBanner[]
}

export default function ProductInfiniteList({ initialData, tiles }: Props) {
  const { products, loadMore, hasNextPage, isLoading, isLoadingMore } =
    useInfiniteProducts(initialData)

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isLoadingMore) loadMore()
  }, [hasNextPage, isLoadingMore, loadMore])

  useEffect(() => {
    if (!loadMoreRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) handleLoadMore()
      },
      { threshold: 0.1 }
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [handleLoadMore])

  if (isLoading) return <ProductListSkeleton />

  return (
    <>
      <ProductList products={products} tiles={tiles} />
      <div ref={loadMoreRef} className="h-10" />
      {isLoadingMore && (
        <p className="mt-4 text-center">
          <Loading />
        </p>
      )}
    </>
  )
}
