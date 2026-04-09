'use client'

import { IcoClose } from '@/components/icons'
import ProductCard from '@/components/products/ProductCard'
import { Button } from '@/components/ui/Button'
import PWSwiper from '@/components/ui/Swiper'
import { ProductCardProps } from '@/types/product/productCard'
import { getCookie, setCookie } from '@/utils/set-cookie'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'

type Props = {
  isTyping: boolean
  predictiveProducts?: ProductCardProps[]
  onClose: () => void
  inputValue: string
}

const SuggestionProducts = ({
  isTyping,
  predictiveProducts = [],
  onClose,
  inputValue,
}: Props) => {
  const [recentProducts, setRecentProducts] = useState<ProductCardProps[]>([])

  const popularProducts: ProductCardProps[] = [
    {
      id: '3',
      title: 'Classic Bag',
      handle: 'classic-bag',
      images: [
        {
          url: '/bag.jpg',
          altText: 'Classic Bag',
        },
      ],
      variantId: '',
      description: '',
      basePrice: 0,
      currency: '$',
      discountPercent: 0,
    },
    {
      id: '4',
      title: 'Denim Jacket',
      handle: 'denim-jacket',
      images: [
        {
          url: '/LogoWhite.webp',
          altText: 'Denim Jacket',
        },
      ],
      variantId: '',
      description: '',
      basePrice: 0,
      currency: '$',
      discountPercent: 0,
    },
  ]

  useEffect(() => {
    try {
      const cookie = getCookie('recentlyViewed')
      if (cookie) {
        const parsed = JSON.parse(cookie)
        if (Array.isArray(parsed)) setRecentProducts(parsed)
      }
    } catch (err) {
      console.error('Failed to parse recentlyViewed cookie', err)
    }
  }, [])

  const onRemove = (handle: string) => {
    const updated = recentProducts.filter((p) => p.handle !== handle)
    setRecentProducts(updated)
    setCookie('recentlyViewed', JSON.stringify(updated))
  }

  const hasPredictive = isTyping && predictiveProducts.length > 0
  const hasRecent = recentProducts.length > 0

  let displayList
  if (isTyping) {
    displayList = hasPredictive ? predictiveProducts : popularProducts
  } else {
    displayList = hasRecent ? recentProducts : popularProducts
  }

  let seeAllUrl = '/collections/best-seller'
  if (displayList === predictiveProducts && inputValue) {
    seeAllUrl = `/search-result?q=${encodeURIComponent(inputValue)}`
  } else if (displayList === recentProducts) {
    seeAllUrl = '/account/recent-viewed'
  }

  return (
    <div>
      <h3 className="text-3xl md:text-4xl">
        {isTyping ? (
          hasPredictive ? (
            <>
              <span className="font-light uppercase">Product</span>
            </>
          ) : (
            <>
              <span className="font-light uppercase">Popular</span>
              <span className="font-sub-heading px-2 font-bold">products</span>
            </>
          )
        ) : hasRecent ? (
          <>
            <span className="font-sub-heading pr-2 font-bold">Recently</span>
            <span className="font-light uppercase">viewed</span>
          </>
        ) : (
          <>
            <span className="uppercase">You</span>
            <span className="font-sub-heading px-2 font-bold">may</span>
            <span className="uppercase">like</span>
          </>
        )}
      </h3>

      <PWSwiper navigation className="pw_swiper">
        {displayList.map((product) => (
          <div
            key={product.id}
            className="relative pt-6"
            onClick={() => onClose()}
          >
            {displayList === recentProducts && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove?.(product.handle)
                }}
                className="bg-sub-primary absolute top-2.5 -right-2 z-11 cursor-pointer rounded-full p-1 hover:scale-110"
                title="Remove"
              >
                <IcoClose className="h-4 w-4" color="white" />
              </button>
            )}

            <div className="relative z-10 pb-4">
              <ProductCard product={product} showCTA={false} />
            </div>
          </div>
        ))}
      </PWSwiper>
      <div className="mt-4 text-center">
        <Link href={seeAllUrl}>
          <Button
            variant={'underline'}
            className="relative px-10 text-center uppercase"
            onClick={onClose}
          >
            + see all results
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default memo(SuggestionProducts)
