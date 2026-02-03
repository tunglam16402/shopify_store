import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCustomFee, mapCartResponse } from '@/lib/helper'
import {
  addCartLine,
  attachCartToCustomer,
  CartLinePersonalizationPayload,
  createCart,
  getCartById,
  removeCartLine,
  updateCartLines,
} from '@/shopify/cart/use-cart'
import { Cart } from '@/types/cart'

interface HydrateCartArgs {
  customerAccessToken?: string
}

export const hydrateCart = createAsyncThunk<Cart | null, HydrateCartArgs>(
  'cart/hydrate',
  async ({ customerAccessToken }) => {
    try {
      const data = localStorage.getItem('shopify_cart')
      if (!data) return null

      const parsed = JSON.parse(data)
      if (!parsed.id) return null

      let freshCartRaw = await getCartById(parsed.id)
      if (!freshCartRaw || freshCartRaw.lines.edges.length === 0) {
        localStorage.removeItem('shopify_cart')
        return null
      }

      if (customerAccessToken) {
        freshCartRaw = await attachCartToCustomer(parsed.id, {
          customerAccessToken,
        })
      }

      return mapCartResponse(freshCartRaw)
    } catch (err) {
      console.error('Failed to hydrate cart:', err)
      return null
    }
  }
)

export const addItem = createAsyncThunk<
  Cart | null,
  {
    variantId: string
    quantity?: number
    personalization?: CartLinePersonalizationPayload
  },
  { state: { cart: { cart: Cart | null } } }
>(
  'cart/addItem',
  async ({ variantId, quantity = 1, personalization }, { getState }) => {
    let currentCart = getState().cart.cart || null

    if (!currentCart) {
      const newCartRaw = await createCart()
      if (!newCartRaw) return null
      currentCart = mapCartResponse(newCartRaw)
    }

    const response = await addCartLine(
      currentCart.id,
      variantId,
      quantity,
      personalization
    )
    if (response?.cartLinesAdd?.cart) {
      return mapCartResponse(response.cartLinesAdd.cart)
    }

    console.error('Add to cart failed', response)
    return currentCart
  }
)

export const updateItem = createAsyncThunk<
  Cart | null,
  { lineId: string; quantity: number },
  { state: { cart: { cart: Cart | null } } }
>('cart/updateItem', async ({ lineId, quantity }, { getState }) => {
  const cart = getState().cart.cart
  if (!cart) return null

  const productLine = cart.lines.find((l) => l.id === lineId)
  if (!productLine) return cart

  const feeLine = getCustomFee(cart, productLine)

  const linesToUpdate = [
    { id: productLine.id, quantity },
    ...(feeLine ? [{ id: feeLine.id, quantity }] : []),
  ]

  const response = await updateCartLines(cart.id, linesToUpdate)

  if (response?.cartLinesUpdate?.cart) {
    return mapCartResponse(response.cartLinesUpdate.cart)
  }

  return cart
})

export const removeItem = createAsyncThunk<
  Cart | null,
  string,
  { state: { cart: { cart: Cart | null } } }
>('cart/removeItem', async (lineId, { getState }) => {
  const cart = getState().cart.cart
  if (!cart) return null

  const productLine = cart.lines.find((l) => l.id === lineId)
  if (!productLine) return cart

  const feeLine = getCustomFee(cart, productLine)

  const lineIds = [productLine.id, ...(feeLine ? [feeLine.id] : [])]

  const response = await removeCartLine(cart.id, lineIds)

  if (response?.cartLinesRemove?.cart) {
    return mapCartResponse(response.cartLinesRemove.cart)
  }

  return cart
})
