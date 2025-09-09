'use client'

import { Button } from '@/components/ui/Button'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { useUI } from '@/lib/hooks/useContext'
import { addItem } from '@/store/thunks/cartThunk'
import { useState } from 'react'

type AddToCartButtonProps = {
  variantId: string
  quantity?: number
}

const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
  const dispatch = useAppDispatch()
  const { open } = useUI('cart')
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      await dispatch(addItem({ variantId, quantity })).unwrap()
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
      disabled={loading}
      className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
    >
      {loading ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}

export default AddToCartButton
