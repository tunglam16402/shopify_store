'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { X } from 'lucide-react'
import Link from 'next/link'
import { CartItem } from '../CartItem'
import CartSubtotal from '../CartSubtotal'
import { useAppSelector } from '@/lib/hooks/useAppSelector'
import { useUI } from '@/lib/hooks/useContext'

const CartSideBar = () => {
  const cart = useAppSelector((state) => state.cart.cart)
  const { isOpen, close } = useUI('cart') // <-- key 'cart'

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 backdrop-blur-[1px] transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full 
          w-full sm:w-[480px] bg-white shadow-xl z-50
          rounded-tl-[40px] rounded-bl-[40px]
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between pt-6 pb-2 px-6 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={close} aria-label="Close">
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="px-6 flex-1 overflow-y-auto">
          {!cart || cart.lines.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.lines.map((item) => (
              <CartItem key={item.id} item={item} variant="sidecart" />
            ))
          )}
        </div>

        {/* Subtotal */}
        <div>
          <CartSubtotal />
        </div>

        {/* Checkout Button */}
        <div className="p-4 flex flex-col items-center justify-center">
          <Link href={'/cart'}>
            <Button className="!w-[350px]" onClick={close}>
              CHECKOUT
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default CartSideBar
