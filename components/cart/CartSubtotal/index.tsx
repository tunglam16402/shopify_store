'use client'

import { useCart } from '@/lib/hooks/useCart'

const CartSubtotal = () => {
  const { cart } = useCart()

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
