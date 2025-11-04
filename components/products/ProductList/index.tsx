/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import ProductCard from '../ProductCard'
import { ProductCardProps } from '@/types/product/productCard'

type Tile = {
  pathname: string
  image: any
  label?: string
}

type ProductListProps = {
  products: ProductCardProps[]
  tiles?: Tile[]
}

const ProductList = ({ products, tiles = [] }: ProductListProps) => {
  const combined: Array<{ type: 'product' | 'tile'; data: any }> = []
  if (tiles[0]) combined.push({ type: 'tile', data: tiles[0] })

  products.forEach((p, idx) => {
    combined.push({ type: 'product', data: p })
    if (idx === 11 && tiles[1]) {
      combined.push({ type: 'tile', data: tiles[1] })
    }
  })

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
      {combined.map((item, i) =>
        item.type === 'product' ? (
          <ProductCard key={`product-${item.data.id}`} product={item.data} />
        ) : (
          <Link
            key={`tile-${i}`}
            href={item.data.pathname || '#'}
            className="block group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
          >
            <PrismicNextImage
              field={item.data.image}
              className="w-full aspect-square object-cover"
              alt={item.data.label || ''}
            />
            {item.data.label && (
              <div className="p-3 text-center font-medium text-sm group-hover:text-blue-600 transition">
                {item.data.label}
              </div>
            )}
          </Link>
        )
      )}
    </div>
  )
}

export default ProductList
