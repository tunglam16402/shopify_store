'use client'

import { Button } from '@/components/ui/button'
import { useCart, useCartUI } from '@/lib/hooks/useCart'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
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
    <div className="rounded-xl border bg-white shadow-md overflow-hidden hover:shadow-lg transition">
      {product.imageUrl && (
        <Link href={`/products/${product.handle}`}>
          <Image
            src={product.imageUrl}
            alt={product.altText || product.title}
            width={400}
            height={400}
            className="object-cover w-full h-64"
          />
        </Link>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-gray-600">{product.description}</p>

        {/* giá */}
        {product.discountPercent > 0 ? (
          <div className="mt-2">
            {product.compareAtPrice && (
              <p className="line-through text-gray-400 text-sm">
                {product.compareAtPrice} {product.currency}
              </p>
            )}
            <p className="text-red-600 font-semibold text-lg">
              {product.basePrice} {product.currency}{' '}
              <span className="text-xs">(-{product.discountPercent}%)</span>
            </p>
          </div>
        ) : (
          <p className="font-semibold text-lg mt-2">
            {product.basePrice} {product.currency}
          </p>
        )}

        <AddToCartButton variantId={product.variantId} />
      </div>
    </div>
  )
}

export default ProductCard
