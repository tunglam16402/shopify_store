'use client'

import IcoCart from '@/components/icons/Cart/IcoCart'
import { useAppSelector } from '@/lib/hooks/useAppSelector'

const CartIcon = ({ onClick }: { onClick: () => void }) => {
  const cart = useAppSelector((state) => state.cart.cart)
  const totalQty = cart?.lines.reduce((sum, x) => sum + x.quantity, 0) ?? 0

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded text-hover"
      aria-label="open cart"
    >
      <IcoCart className="w-6 h-6" />
      {totalQty > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalQty}
        </span>
      )}
    </button>
  )
}

export default CartIcon
