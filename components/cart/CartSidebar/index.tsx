'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CartItem } from '../CartItem'
import CartSubtotal from '../CartSubtotal'
import { useAppSelector } from '@/lib/hooks/useAppSelector'
import StyledHeading from '@/components/ui/StyledHeading'

interface ICartSideBar {
  isClose: () => void
}

const CartSideBar = ({ isClose }: ICartSideBar) => {
  const cart = useAppSelector((state) => state.cart.cart)

  return (
    <div className="flex h-full flex-col">
      <div className=" pt-2 pb-2 px-4 border-b">
        <StyledHeading
          headingClass="text-4xl md:text-[54px]"
          subHeadingClass="font-sub-heading text-5xl md:text-[54px]"
          text="Shopping cart"
        />
      </div>
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-4">
        {!cart || cart.lines.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty</p>
        ) : (
          cart.lines.map((item) => (
            <CartItem key={item.id} item={item} variant="sidecart" />
          ))
        )}
      </div>
      {/* Subtotal */}
      <CartSubtotal />
      {/* Checkout */}
      <div className="p-4">
        <Link href="/cart">
          <Button className="w-full" onClick={isClose}>CHECKOUT</Button>
        </Link>
      </div>
    </div>
  )
}

export default CartSideBar
