'use client'

import { CartSubTotal } from '@/types/cart'

interface ICartSubtotal {
  subTotal?: CartSubTotal
}

const CartSubtotal = ({ subTotal }: ICartSubtotal) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-light uppercase md:text-3xl">Subtotal:</h4>
        <span className="text-2xl md:text-3xl">
          {subTotal?.currencyCode}
          {subTotal?.amount}
        </span>
      </div>
      <div className="mt-2 text-xs md:mt-3">
        Shipping and taxes calculated at checkout
      </div>
    </div>
  )
}

export default CartSubtotal
