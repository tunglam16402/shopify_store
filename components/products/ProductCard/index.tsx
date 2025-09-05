'use client'

import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '../AddToCartButton'

export type ProductCardProps = {
  product: {
    id: string
    variantId: string
    title: string
    handle: string
    description: string
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
    <div className="group relative rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Badge giảm giá */}
      {product.discountPercent > 0 && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">
          -{product.discountPercent}%
        </span>
      )}

      {/* Hình ảnh */}
      {product.imageUrl && (
        <Link
          href={`/products/${product.handle}`}
          className="block overflow-hidden"
        >
          <Image
            src={product.imageUrl}
            alt={product.altText || product.title}
            width={400}
            height={400}
            className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}

      <div className="p-5 flex flex-col justify-between h-[220px]">
        {/* Title & description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Giá */}
        <div className="mt-3">
          {product.discountPercent > 0 ? (
            <div className="flex items-center gap-2">
              {product.compareAtPrice && (
                <span className="line-through text-gray-400 text-sm">
                  {product.compareAtPrice} {product.currency}
                </span>
              )}
              <span className="text-red-600 font-bold text-lg">
                {product.basePrice} {product.currency}
              </span>
            </div>
          ) : (
            <span className="font-bold text-lg text-gray-900">
              {product.basePrice} {product.currency}
            </span>
          )}
        </div>

        {/* Button */}
        <div className="mt-4">
          <AddToCartButton variantId={product.variantId} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
