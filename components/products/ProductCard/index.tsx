'use client'

import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '../AddToCartButton'
import { BorderHeart } from '@/components/icons/BorderHeart'

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
    <div className="relative">
      <Link
        href={`/products/${product.handle}`}
        className="block relative aspect-[4/5]"
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
        <div>
          {product.discountPercent > 0 && (
            <span className=" bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
              -{product.discountPercent}%
            </span>
          )}
        </div>
        <div>
          <BorderHeart className='size-6' />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {product.category && (
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {product.category}
          </p>
        )}

        <h2 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h2>
        <div className="mt-auto">
          {product.discountPercent > 0 ? (
            <div className="flex items-center gap-2">
              {product.compareAtPrice && (
                <span className="line-through text-gray-400 text-sm">
                  {product.compareAtPrice} {product.currency}
                </span>
              )}
              <span className=" font-bold">
                {product.basePrice} {product.currency}
              </span>
            </div>
          ) : (
            <span className="font-bold text-lg text-gray-900">
              {product.basePrice} {product.currency}
            </span>
          )}
        </div>

        <AddToCartButton variantId={product.variantId} />
      </div>
    </div>
  )
}

export default ProductCard
