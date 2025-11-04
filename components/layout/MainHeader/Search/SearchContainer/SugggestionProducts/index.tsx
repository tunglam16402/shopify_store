'use client'

import { IcoClose } from '@/components/icons'
import ProductCard from '@/components/products/ProductCard'
import { Button } from '@/components/ui/Button'
import { ProductCardProps } from '@/types/product/productCard'
import { getCookie, setCookie } from '@/utils/set-cookie'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'

type Props = {
  isTyping: boolean
  predictiveProducts?: ProductCardProps[]
  onSelect: (term: string) => void
}

const SuggestionProducts = ({
  isTyping,
  predictiveProducts = [],
  onSelect,
}: Props) => {
  const [recentProducts, setRecentProducts] = useState<ProductCardProps[]>([])

  console.log('recentProducts :>> ', recentProducts)

  const popularProducts: ProductCardProps[] = [
    {
      id: '3',
      title: 'Classic Bag',
      handle: 'classic-bag',
      imageUrl: '/bag.jpg',
      variantId: '',
      description: '',
      basePrice: 0,
      currency: '',
      discountPercent: 0,
    },
    {
      id: '4',
      title: 'Denim Jacket',
      handle: 'denim-jacket',
      imageUrl: '/jacket.jpg',
      variantId: '',
      description: '',
      basePrice: 0,
      currency: '',
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {displayList.map((product) => {
          return (
            <div key={product.id} className="relative">
              {displayList === recentProducts && (
                <button
                  type="button"
                  onClick={() => onRemove?.(product.handle)}
                  className="absolute top-[-13px] right-[-20px] bg-sub-primary rounded-full p-1 cursor-pointer z-10"
                  title="Remove"
                >
                  <IcoClose className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              )}
              <ProductCard product={product} showCTA={false} />
            </div>
          )
        })}
      </div>
      <div className="text-center mt-4">
        <Link href={`/collections/${predictiveProducts[0]?.category}`}>
          <Button
            variant={'underline'}
            className="px-10 text-center uppercase cursor-pointer relative"
          >
            + see all results
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default memo(SuggestionProducts)
