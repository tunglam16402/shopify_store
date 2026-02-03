'use client'

import { CartItem } from '@/components/cart/CartItem'
import { Button } from '@/components/ui/Button'
import { useAppSelector } from '@/lib/hooks/useAppSelector'
import Link from 'next/link'
import CartSubtotal from '../CartSubtotal'
import { getCartDisplayItems } from '../helper'

const CartPage = () => {
  const cart = useAppSelector((state) => state.cart.cart)
  const displayItems = getCartDisplayItems(cart)

  if (!cart) return null

  const subTotal = cart.cost.subtotalAmount

  const handleCheckout = () => {
    if (!cart?.checkoutUrl) return
    window.location.href = cart.checkoutUrl
  }

  return (
    <div className="space-y-4">
      {!cart || cart.lines.length === 0 ? (
        <div className="py-20 text-center">
          <Link href={'/products'}>
            <h1 className="mb-6 text-5xl">Your cart is empty!</h1>
            <Button>Click here to start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-4xl font-semibold">Shopping Cart</h1>

          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="w-full space-y-4 lg:w-3/5">
              {displayItems.map(
                ({ line, displayPrice, displayComparedAtPrice }) => (
                  <CartItem
                    key={line.id}
                    item={line}
                    variant="checkout"
                    displayPrice={displayPrice}
                    displayComparedAtPrice={displayComparedAtPrice}
                  />
                )
              )}
            </div>

            <div className="w-full space-y-4 lg:w-2/5">
              <CartSubtotal subTotal={subTotal} />
              <Button onClick={handleCheckout}>CHECKOUT</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
