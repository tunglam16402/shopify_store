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
    <div className="relative w-full flex flex-col h-full">
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`relative aspect-4/5 overflow-hidden ${styles.card}`}
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

        {showCTA && !isMobile && (
          <div className={styles.cta}>
            <AddToCart
              variantId={product.variantId}
              product={product}
              className="w-full py-6 rounded-none"
            />
          </div>
        )}

        <div className="flex justify-between absolute top-4 left-2 right-2 z-2">
          {product.discountPercent > 0 ? (
            <span className="bg-sub-primary text-white text-xs font-semibold px-2 py-1 rounded-md z-2">
              -{product.discountPercent}%
            </span>
          ) : (
            <span></span>
          )}
          <WishlistButton productId={product.id} iconClassName='size-5 md:size-6'/>
        </div>
      </div>

      <div className="flex flex-col flex-1 mt-3 px-2">
        <div className="md:min-h-6 min-h-5">
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
            <p className="md:text-base font-semibold text-gray-800 line-clamp-2 md:line-clamp-1 min-h-12 md:min-h-0 capitalize">
              {product.title}
            </p>
          </Link>
        </div>

        <div className="flex flex-col md:flex-col-reverse">
          {/* price */}
          <div className="min-h-7 mt-1">
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

          {/* ratings */}
          <div className="min-h-6 mt-2 ">
            {avgRating || totalReviews ? (
              <div className="flex items-center gap-2">
                <StarRating rating={avgRating} size={4} />
                <span className="text-sm text-primary">
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
