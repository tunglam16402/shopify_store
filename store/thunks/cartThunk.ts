import { createAsyncThunk } from '@reduxjs/toolkit'
import { mapCartResponse } from '@/lib/helper'
import {
  addCartLine,
  attachCartToCustomer,
  CartLinePersonalizationPayload,
  createCart,
  getCartById,
  removeCartLine,
  updateCartLine,
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
  const currentCart = getState().cart.cart
  if (!currentCart) return null

  const response = await updateCartLine(currentCart.id, lineId, quantity)
  if (response?.cartLinesUpdate?.cart) {
    return mapCartResponse(response.cartLinesUpdate.cart)
  }
  console.error('Update cart failed', response)
  return currentCart
})

export const removeItem = createAsyncThunk<
  Cart | null,
  string,
  { state: { cart: { cart: Cart | null } } }
>('cart/removeItem', async (lineId, { getState }) => {
  const currentCart = getState().cart.cart
  if (!currentCart) return null

  const response = await removeCartLine(currentCart.id, [lineId])
  if (response?.cartLinesRemove?.cart) {
    return mapCartResponse(response.cartLinesRemove.cart)
  }
  console.error('Remove cart line failed', response)
  return currentCart
})
