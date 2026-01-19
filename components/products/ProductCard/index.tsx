'use client'

import Image from 'next/image'
import Link from 'next/link'
import AddToCart from '../AddToCart'
import { BorderHeart } from '@/components/icons'
import { getCookie, setCookie } from '@/utils/set-cookie'
import { ProductCardProps } from '@/types/product/productCard'
import { useMemo, useState } from 'react'
import { useReviews } from '@/lib/hooks/useReviews'
import StarRating from '../ProductReview/TotalRating/StarRating'

interface IProductCardProps {
  product: ProductCardProps
  showCTA?: boolean
}

const ProductCard = ({ product, showCTA = true }: IProductCardProps) => {
  const [isHover, setIsHover] = useState(false)
  const { data } = useReviews(product.id)

  const avgRating = data?.summary?.avgRating ?? 0
  const totalReviews = data?.summary?.totalReviews ?? 0
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
          images: product.images?.length ? product.images.slice(0, 1) : [],
          basePrice: product.basePrice,
          currency: product.currency,
          discountPercent: product.discountPercent,
          compareAtPrice: product.compareAtPrice,
        },
        ...existing?.filter((p) => p.id !== product.id),
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
          <Image
            src={(isHover && secondImage ? secondImage : image) || ''}
            alt={product?.images?.[0]?.altText || product.title}
            fill
            className="object-contain"
            sizes="max-width: 50vw, 25vw"
            loading={'lazy'}
          />
        </Link>
        <div className="flex justify-between absolute top-4 left-2 right-2 z-2">
          {product.discountPercent > 0 ? (
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md z-2">
              -{product.discountPercent}%
            </span>
          ) : (
            <span >
            </span>
          )}
          <BorderHeart className="size-6" />
        </div>
      </div>

      <div className="grid grid-rows-[auto_minmax(2.5rem,auto)_auto_auto_auto] flex-1 mt-3 px-2 md:px-0">
        <div className="min-h-6">
          {product.category && (
            <p className="text-xs md:text-sm font-light uppercase tracking-wide">
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
            <p className="md:text-base font-semibold text-gray-800 line-clamp-2 min-h-10 capitalize">
              {product.title}
            </p>
          </Link>
        </div>

        {/* price */}
        <div className="min-h-7">
          {product.discountPercent > 0 ? (
            <div className="flex items-center gap-2">
              {product.compareAtPrice && (
                <span className="line-through text-gray-400 text-sm">
                  {product.currency}
                  {product.compareAtPrice}
                </span>
              )}
              <span className="font-bold text-lg">
                {product.currency}
                {product.basePrice}
              </span>
            </div>
          ) : (
            <span className="font-bold text-lg text-gray-900">
              {product.currency}
              {product.basePrice}
            </span>
          )}
        </div>
        <div className="min-h-6 mt-2">
          {avgRating || totalReviews ? (
            <div className="flex items-center gap-2">
              <StarRating rating={avgRating} size={4} />

              <span className="text-sm text-gray-600">
                {avgRating.toFixed(1)} ({totalReviews})
              </span>
            </div>
          ) : (
            <div></div>
          )}
        </div>

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
