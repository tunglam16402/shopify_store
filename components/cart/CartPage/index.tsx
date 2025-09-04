'use client'

import { CartItem } from '@/components/cart/CartItem'
import React from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/hooks/useCart'
import { Button } from '@/components/ui/Button'
import CartSubtotal from '../CartSubtotal'

const CartPage = () => {
  const { cart } = useCart()

  const handleCheckout = () => {
    if (!cart?.checkoutUrl) return
    window.location.href = cart.checkoutUrl
  }

  console.log('cart.checkoutUrl :>> ', cart?.checkoutUrl)

  return (
    <div className="space-y-4">
      {!cart || cart.lines.length === 0 ? (
        <div className="py-20 text-center">
          <Link href={'/products'}>
            <h1 className=" text-5xl mb-6">Your cart is empty!</h1>
            <Button>Click here to start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-semibold mb-8">Shopping Cart</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-3/5 space-y-4">
              {cart?.lines?.map((item) => (
                <CartItem key={item.id} item={item} variant="checkout" />
              ))}
            </div>

            <div className="w-full lg:w-2/5 space-y-4">
              <CartSubtotal />
              <Button onClick={handleCheckout}>CHECKOUT</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
