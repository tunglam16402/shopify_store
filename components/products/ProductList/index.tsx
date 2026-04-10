'use client'

import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import ProductCard from '../ProductCard'
import { ProductCardProps } from '@/types/product/productCard'
import { TileBanner } from '@/components/collection/Banner'
import { useReviewSummary } from '@/lib/hooks/useReviewSummary'
import { useMemo } from 'react'

type GridItem =
  | { type: 'product'; data: ProductCardProps }
  | { type: 'tile'; data: TileBanner & { startIndex: number } }

type ProductListProps = {
  products: ProductCardProps[]
  tiles?: TileBanner[]
}

const COLS_DESKTOP = 4
const BANNER_SPAN = 4

const ProductList = ({ products, tiles = [] }: ProductListProps) => {
  const productIds = products.map((p) => p.id)
  const { summaryMap } = useReviewSummary(productIds)

  const banners = tiles
    .filter((t) => t.startAfterRow !== undefined)
    .map((t) => ({
      ...t,
      startIndex: Number(t.startAfterRow) * COLS_DESKTOP,
    }))
    .sort((a, b) => a.startIndex - b.startIndex)

  const gridItems = useMemo<GridItem[]>(() => {
    const items: GridItem[] = []
    let gridIndex = 0
    let productIndex = 0

    while (productIndex < products.length) {
      const banner = banners.find((b) => b.startIndex === gridIndex)

      if (banner) {
        items.push({ type: 'tile', data: banner })
        gridIndex += BANNER_SPAN
        continue
      }

      items.push({
        type: 'product',
        data: products[productIndex],
      })

      productIndex++
      gridIndex++
    }

    return items
  }, [products, banners])

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
      {gridItems.map((item, i) =>
        item.type === 'product' ? (
          <ProductCard
            key={`product-${item.data.id}`}
            product={item.data}
            summary={summaryMap?.[item.data.id]}
          />
        ) : (
          <Link
            key={`tile-${i}`}
            href={item.data.pathname || '#'}
            className="group col-span-2 row-span-2 block overflow-hidden border border-gray-200"
          >
            <PrismicNextImage
              field={item.data.image}
              className="h-full w-full object-cover"
              alt=""
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Link>
        )
      )}
    </div>
  )
}

export default ProductList
