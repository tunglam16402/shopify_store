'use client'

import { useEffect, useState } from 'react'
import { getCookie, setCookie } from '@/utils/set-cookie'
import SuggestionItem, { ViewedProduct } from '../SuggestionItem'
import ProductCard from '@/components/products/ProductCard'
import { IcoClose } from '@/components/icons'
import { ProductCardProps } from '@/types/product/productCard'

type Props = {
  isTyping: boolean
  onSelect: (term: string) => void
}

const SuggestionProducts = ({ isTyping, onSelect }: Props) => {
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

  const displayList =
    recentProducts.length > 0 ? recentProducts : popularProducts

  return (
    <div>
      <h3 className="text-3xl md:text-5xl">
        {isTyping ? (
          <>
            <span className="uppercase font-light">Products</span>
          </>
        ) : recentProducts.length > 0 ? (
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
              {recentProducts && (
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
    </div>
  )
}

export default SuggestionProducts
