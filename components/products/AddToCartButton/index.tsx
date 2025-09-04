'use client'

import { Button } from '@/components/ui/Button'
import { useCart, useCartUI } from '@/lib/hooks/useCart'
import { useState } from 'react'

type AddToCartButtonProps = {
  variantId: string
  quantity?: number
}

const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
  const { addItem } = useCart()
  const { openCart } = useCartUI()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      await addItem(variantId, quantity)
      openCart?.()
    } catch (err) {
      console.error('Add to cart failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={loading}
      className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
    >
      {loading ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}

export default AddToCartButton
