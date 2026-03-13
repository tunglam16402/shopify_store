'use client'

import WishlistButton from '@/components/common/WishlistButton'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { useReviews } from '@/lib/hooks/useReviews'
import { ProductCardProps } from '@/types/product/productCard'
import { getCookie, setCookie } from '@/utils/set-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import AddToCart from '../AddToCart'
import StarRating from '../ProductReview/TotalRating/StarRating'
import styles from './style.module.css'

interface IProductCardProps {
  product: ProductCardProps
  showCTA?: boolean
}

const ProductCard = ({ product, showCTA = true }: IProductCardProps) => {
  const [isHover, setIsHover] = useState(false)
  const { data } = useReviews(product.id)
  const isMobile = useMediaQuery('(max-width: 768px)')

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
      const recentProduct = getCookie('recentlyViewed')

      const existing = (() => {
        if (!recentProduct) return []
        try {
          const parsed = JSON.parse(recentProduct)
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
    <div className="relative flex h-full w-full flex-col">
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`relative aspect-4/5 overflow-hidden ${styles.card}`}
      >
        <Link
          href={`/products/${product?.handle}`}
          onClick={handleProductClick}
          className="relative block h-full w-full"
        >
          <Image
            src={(isHover && secondImage ? secondImage : image) || ''}
            alt={product?.images?.[0]?.altText || product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 59vw, 25vw"
            loading={'lazy'}
          />
        </Link>

        {showCTA && !isMobile && (
          <div className={styles.cta}>
            <AddToCart
              variantId={product.variantId}
              product={product}
              className="w-full rounded-none py-6"
            />
          </div>
        )}

        <div className="absolute top-4 right-2 left-2 z-2 flex justify-between">
          {product.discountPercent ? (
            <span className="bg-sub-primary z-2 rounded-md px-2 py-1 text-xs font-semibold text-white">
              -{product.discountPercent}%
            </span>
          ) : (
            <span></span>
          )}
          <WishlistButton
            productId={product.id}
            iconClassName="size-5 md:size-6"
          />
        </div>
      </div>

      <div className="mt-3 flex flex-1 flex-col px-2">
        <div className="min-h-5 md:min-h-6">
          {product.category && (
            <p className="text-xs font-light tracking-wide uppercase md:text-sm">
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
            <p className="line-clamp-2 min-h-12 font-semibold text-gray-800 capitalize md:line-clamp-1 md:min-h-0 md:text-base">
              {product.title}
            </p>
          </Link>
        </div>

        <div className="flex flex-col md:flex-col-reverse">
          {/* price */}
          <div className="mt-1 min-h-7">
            {product.discountPercent ? (
              <div className="flex items-center gap-2">
                {product.compareAtPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.currency}
                    {product.compareAtPrice}
                  </span>
                )}
                <span className="text-lg font-bold">
                  {product.currency}
                  {product.basePrice}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {product.currency}
                {product.basePrice}
              </span>
            )}
          </div>

          {/* ratings */}
          <div className="mt-2 min-h-6">
            {avgRating || totalReviews ? (
              <div className="flex items-center gap-2">
                <StarRating rating={avgRating} size={4} />
                <span className="text-primary text-sm">
                  {avgRating.toFixed(1)} ({totalReviews})
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {showCTA && isMobile && (
          <div className="mt-3">
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
