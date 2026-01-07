/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import AddToCart from '../AddToCart'
import { BorderHeart } from '@/components/icons'
import { getCookie, setCookie } from '@/utils/set-cookie'
import { ProductCardProps } from '@/types/product/productCard'
import { useMemo, useState } from 'react'

interface IProductCardProps {
  product: ProductCardProps
  showCTA?: boolean
}

const ProductCard = ({ product, showCTA = true }: IProductCardProps) => {
  const [isHover, setIsHover] = useState(false)

  console.log('product :>> ', product);

  const { image, secondImage } = useMemo(() => {
    return {
      image: product.images?.[0]?.url || '',
      secondImage: product.images?.[1]?.url || '',
    }
  }, [product.images])

  const handleProductClick = () => {
    try {
      const raw = getCookie('recentlyViewed')

      const existing = (() => {
        if (!raw) return []
        try {
          const parsed = JSON.parse(raw)
          return Array.isArray(parsed) ? parsed : []
        } catch {
          return []
        }
      })()

      const updated = [
        {
          id: product.id,
          handle: product.handle,
          title: product.title,
          category: product.category,
          imageUrl: image,
          basePrice: product.basePrice,
          currency: product.currency,
          discountPercent: product.discountPercent,
          compareAtPrice: product.compareAtPrice,
        },
        ...existing?.filter((p: any) => p.id !== product.id),
      ].slice(0, 5)

      setCookie('recentlyViewed', JSON.stringify(updated), {
        path: '/',
        expires: 30,
      })
    } catch (error) {
      console.error('Failed to save recent product:', error)
    }
  }

  return (
    <div className="relative w-full flex flex-col h-full">
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative aspect-4/5"
      >
        <Link
          href={`/products/${product?.handle}`}
          onClick={handleProductClick}
          className="relative block w-full h-full"
        >
          {product.images && (
            <Image
              src={(isHover && secondImage ? secondImage : image) || ''}
              alt={product.images[0].altText || product.title}
              fill
              className="object-contain"
              sizes="max-width: 50vw, 25vw"
              loading={'lazy'}
            />
          )}
        </Link>
        <div className="flex justify-between absolute top-4 left-2 right-2 z-10">
          {product.discountPercent > 0 && (
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md z-2">
              -{product.discountPercent}%
            </span>
          )}
          <BorderHeart className="size-6" />
        </div>
      </div>

      <div className="grid grid-rows-[auto_minmax(2.5rem,auto)_auto_auto] flex-1 mt-3 px-2 md:px-0">
        <div className="min-h-4">
          {product.category && (
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              {product.category}
            </p>
          )}
        </div>

        {/* title */}
        <div>
          <Link
            href={`/products/${product?.handle}`}
            onClick={handleProductClick}
          >
            <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-10">
              {product.title}
            </h2>
          </Link>
        </div>

        {/* price */}
        <div className="min-h-7">
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
        {showCTA && (
          <div className="mt-3 self-end">
            <AddToCart
              variantId={product.variantId}
              className="w-full"
              product={product}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
