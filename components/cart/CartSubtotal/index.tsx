'use client'

import { useAppSelector } from '@/lib/hooks/useAppSelector'

const CartSubtotal = () => {
  const cart = useAppSelector((state) => state.cart.cart)

  if (!cart) return null

  return (
    <div className="py-4 px-10 border-t mt-4">
      <div className="flex justify-between font-semibold">
        <span>Subtotal:</span>
        <span>
          {cart.cost.subtotalAmount.amount}
          {cart.cost.subtotalAmount.currencyCode}
        </span>
      </div>
    </div>
  )
}

export default CartSubtotal
