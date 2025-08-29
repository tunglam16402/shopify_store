'use client'

import { mapCartResponse } from '@/lib/helper'
import { addCartLine, createCart } from '@/shopify/cart/use-cart'
import { ReactNode, createContext, useState, useEffect } from 'react'

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: { amount: number; currencyCode: string }
    compareAtPrice?: { amount: number; currencyCode: string } | null
    image?: { url: string; altText: string } | null
  }
}

export type Cart = {
  id: string
  createdAt: string
  updatedAt: string
  lines: CartLine[]
  cost: { totalAmount: { amount: number; currencyCode: string } }
}

interface CartContextType {
  cart: Cart | null
  addItem: (variantId: string, quantity?: number) => Promise<void>
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null)

  // Load cart từ localStorage nếu có
  useEffect(() => {
    const data = localStorage.getItem('shopify_cart')
    if (data) setCart(JSON.parse(data))
  }, [])

  // Lưu cart vào localStorage
  useEffect(() => {
    if (cart) localStorage.setItem('shopify_cart', JSON.stringify(cart))
  }, [cart])

  const addItem = async (variantId: string, quantity = 1) => {
    try {
      let currentCart = cart

      if (!currentCart) {
        const newCartRaw = await createCart()
        if (!newCartRaw) return

        const newCart = mapCartResponse(newCartRaw) // flatten edges
        setCart(newCart)
        currentCart = newCart
      }

      const response = await addCartLine(currentCart.id, variantId, quantity)
      if (response?.cartLinesAdd?.cart) {
        const updatedCart = mapCartResponse(response.cartLinesAdd.cart)
        setCart(updatedCart)
      } else {
        console.error('Add to cart failed', response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <CartContext.Provider value={{ cart, addItem }}>
      {children}
    </CartContext.Provider>
  )
}
