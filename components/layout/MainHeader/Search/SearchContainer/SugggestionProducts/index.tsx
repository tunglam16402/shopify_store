'use client'

import { IcoClose } from '@/components/icons'
import ProductCard from '@/components/products/ProductCard'
import { Button } from '@/components/ui/Button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel'
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

  console.log('recentProducts :>> ', recentProducts)

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

  console.log('displayList :>> ', displayList)

  return (
    <div>
      <h3 className="text-3xl md:text-4xl">
        {isTyping ? (
          hasPredictive ? (
            <>
              <span className="uppercase font-light">Product</span>
            </>
          ) : (
            <>
              <span className="uppercase font-light">Popular</span>
              <span className="font-[tangerine] font-bold px-2">products</span>
            </>
          )
        ) : hasRecent ? (
          <>
            <span className="font-[tangerine] font-bold pr-2">Recently</span>
            <span className="uppercase font-light">viewed</span>
          </>
        ) : (
          <>
            <span className="uppercase">You</span>
            <span className="font-[tangerine] font-bold px-2">may</span>
            <span className="uppercase">like</span>
          </>
        )}
      </h3>

      <div>
        <Carousel className="w-full ">
          <CarouselContent className="pt-6">
            {displayList.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-1/2 md:basis-1/4 pl-2 md:pl-4 relative overflow-visible"
                onClick={() => onClose()}
              >
                {displayList === recentProducts && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove?.(product.handle)
                    }}
                    className="absolute -top-2.5 -right-2 bg-sub-primary rounded-full p-1 cursor-pointer z-11 hover:scale-110"
                    title="Remove"
                  >
                    <IcoClose className="h-4 w-4" color='white' />
                  </button>
                )}

                <div className="relative z-10">
                  <ProductCard product={product} showCTA={false} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="text-center mt-4">
        <Link href={seeAllUrl}>
          <Button
            variant={'underline'}
            className="px-10 text-center uppercase relative"
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
