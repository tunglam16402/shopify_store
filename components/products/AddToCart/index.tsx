'use client'

import { Button } from '@/components/ui/Button'
import { trackAddedToCart } from '@/lib/analytics/klaviyo'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { useUI } from '@/lib/hooks/useContext'
import { CartLinePersonalizationPayload } from '@/shopify/cart/use-cart'
import { addItem } from '@/store/thunks/cartThunk'
import { useState } from 'react'

type AddToCartProps = {
  variantId: string
  quantity?: number
  personalization?: CartLinePersonalizationPayload
  className?: string
  product?: {
    title: string
    featuredImage?: string | null
    vendor?: string
    handle: string
    basePrice?: number
  }
  price?: number
  showPrice?: boolean
}

const AddToCart = ({
  variantId,
  quantity = 1,
  personalization,
  className,
  product,
  showPrice = false,
  price,
}: AddToCartProps) => {
  const dispatch = useAppDispatch()
  const { open } = useUI('cart')
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      await dispatch(addItem({ variantId, quantity, personalization })).unwrap()
      trackAddedToCart({
        name: product?.title ?? '',
        productID: variantId,
        imageURL: product?.featuredImage ?? '',
        handle: product?.handle ?? '',
        brand: product?.vendor ?? '',
        price: String(product?.basePrice),
      })
      open?.()
    } catch (err) {
      console.error('Add to cart failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={'outline'}
      disabled={loading}
      className={`uppercase font-semibold ${className}`}
    >
      {loading ? 'Adding...' : 'Add to Cart'}
      {showPrice && typeof price === 'number' && (
        <span>| ${price.toFixed(2)}</span>
      )}
    </Button>
  )
}

export default AddToCart
