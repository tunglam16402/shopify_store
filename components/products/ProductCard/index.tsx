'use client'

import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '../AddToCartButton'
import { BorderHeart } from '@/components/icons'

export type ProductCardProps = {
  product: {
    id: string
    variantId: string
    title: string
    handle: string
    description: string
    category?: string
    imageUrl?: string
    altText?: string | null
    basePrice: number
    compareAtPrice?: number
    currency: string
    discountPercent: number
  }
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="relative w-full flex flex-col h-full mx-2">
      <Link
        href={`/products/${product.handle}`}
        className="relative aspect-[4/5]"
      >
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.altText || product.title}
            fill
            className="object-contain"
          />
        )}
      </Link>

      <div className="flex justify-between absolute top-4 left-2 right-2">
        {product.discountPercent > 0 && (
          <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
            -{product.discountPercent}%
          </span>
        )}
        <BorderHeart className="size-6" />
      </div>

      <div className="grid grid-rows-[auto_minmax(2.5rem,auto)_auto_auto] flex-1 mt-3">
        <div className="min-h-[1rem]">
          {product.category && (
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              {product.category}
            </p>
          )}
        </div>

        {/* title */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">
            {product.title}
          </h2>
        </div>

        {/* price */}
        <div className="min-h-[1.75rem]">
          {product.discountPercent > 0 ? (
            <div className="flex items-center gap-2">
              {product.compareAtPrice && (
                <span className="line-through text-gray-400 text-sm">
                  {product.compareAtPrice} {product.currency}
                </span>
              )}
              <span className="font-bold">
                {product.basePrice} {product.currency}
              </span>
            </div>
          ) : (
            <span className="font-bold text-lg text-gray-900">
              {product.basePrice} {product.currency}
            </span>
          )}
        </div>

        {/* button */}
        <div className="mt-3 self-end">
          <AddToCartButton variantId={product.variantId} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
