'use client'

import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import ProductCard from '../ProductCard'
import { ProductCardProps } from '@/types/product/productCard'
import { TileBanner } from '@/components/collection/Banner'

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
  const banners = tiles
    .filter((t) => t.startAfterRow !== undefined)
    .map((t) => ({
      ...t,
      startIndex: Number(t.startAfterRow) * COLS_DESKTOP,
    }))
    .sort((a, b) => a.startIndex - b.startIndex)

  const gridItems: GridItem[] = []
  let gridIndex = 0
  let productIndex = 0

  while (productIndex < products.length) {
    const banner = banners.find((b) => b.startIndex === gridIndex)

    if (banner) {
      gridItems.push({ type: 'tile', data: banner })
      gridIndex += BANNER_SPAN
      continue
    }

    gridItems.push({
      type: 'product',
      data: products[productIndex],
    })

    productIndex++
    gridIndex++
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 gap-y-4 md:gap-4">
      {gridItems.map((item, i) =>
        item.type === 'product' ? (
          <ProductCard key={`product-${item.data.id}`} product={item.data} />
        ) : (
          <Link
            key={`tile-${i}`}
            href={item.data.pathname || '#'}
            className="col-span-2 row-span-2 block group overflow-hidden border border-gray-200"
          >
            <PrismicNextImage
              field={item.data.image}
              className="w-full h-full object-cover"
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
