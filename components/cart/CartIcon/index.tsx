'use client'

import { useCart } from '@/lib/hooks/useCart'
import { ShoppingCart } from 'lucide-react'

const CartIcon = ({ onClick }: { onClick: () => void }) => {
  const { cart } = useCart()
  const totalQty = cart?.lines.reduce((sum, x) => sum + x.quantity, 0) ?? 0

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded text-hover cursor-pointer"
      aria-label="open cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalQty > 0 && (
        <span className="absolute -top-1 -right-1 bg-darker-main-color text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalQty}
        </span>
      )}
    </button>
  )
}

export default CartIcon
