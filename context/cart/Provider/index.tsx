'use client'

import { mapCartResponse } from '@/lib/helper'
import {
  addCartLine,
  createCart,
  getCartById,
  removeCartLine,
  updateCartLine,
} from '@/shopify/cart/use-cart'
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
    product: { title: string; totalInventory: number }
  }
}

export type Cart = {
  id: string
  createdAt: string
  updatedAt: string
  checkoutUrl: string
  lines: CartLine[]
  cost: {
    totalAmount: { amount: number; currencyCode: string }
    subtotalAmount: { amount: number; currencyCode: string }
  }
}

interface CartContextType {
  cart: Cart | null
  addItem: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('shopify_cart')
    if (!data) return

    const parsed = JSON.parse(data)
    if (!parsed.id) return

    getCartById(parsed.id)
      .then((freshCartRaw) => {
        if (!freshCartRaw || freshCartRaw.lines.edges.length === 0) {
          localStorage.removeItem('shopify_cart')
          setCart(null)
        } else {
          const freshCart = mapCartResponse(freshCartRaw)
          setCart(freshCart)
        }
      })
      .catch((err) => {
        console.error('Failed to hydrate cart:', err)
      })
  }, [])

  useEffect(() => {
    if (cart) localStorage.setItem('shopify_cart', JSON.stringify(cart))
  }, [cart])

  const addItem = async (variantId: string, quantity = 1) => {
    try {
      let currentCart = cart

      if (!currentCart) {
        const newCartRaw = await createCart()
        if (!newCartRaw) return

        const newCart = mapCartResponse(newCartRaw)
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

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cart) return
    try {
      const response = await updateCartLine(cart.id, lineId, quantity)
      if (response?.cartLinesUpdate?.cart) {
        const updateCart = mapCartResponse(response.cartLinesUpdate.cart)
        setCart(updateCart)
      } else {
        console.error('Update cart failed', response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const removeItem = async (lineId: string) => {
    if (!cart) return
    try {
      const response = await removeCartLine(cart.id, [lineId])
      if (response?.cartLinesRemove?.cart) {
        const updateCart = mapCartResponse(response.cartLinesRemove.cart)
        setCart(updateCart)
      } else {
        console.error('Remove cart line failed', response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <CartContext.Provider value={{ cart, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}
