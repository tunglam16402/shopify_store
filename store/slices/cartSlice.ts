import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  hydrateCart,
  addItem,
  updateItem,
  removeItem,
} from '../thunks/cartThunk'
import { Cart } from '@/types/cart'

interface CartState {
  cart: Cart | null
  hydrated: boolean
}

const initialState: CartState = {
  cart: null,
  hydrated: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null
      localStorage.removeItem('shopify_cart')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        hydrateCart.fulfilled,
        (state, action: PayloadAction<Cart | null>) => {
          state.cart = action.payload
          state.hydrated = true
          if (action.payload) {
            localStorage.setItem('shopify_cart_id', action.payload.id)
          }
        }
      )
      .addCase(hydrateCart.rejected, (state) => {
        state.hydrated = true
      })
      .addCase(
        addItem.fulfilled,
        (state, action: PayloadAction<Cart | null>) => {
          state.cart = action.payload
          if (action.payload)
            localStorage.setItem('shopify_cart', JSON.stringify(action.payload))
        }
      )
      .addCase(
        updateItem.fulfilled,
        (state, action: PayloadAction<Cart | null>) => {
          state.cart = action.payload
          if (action.payload)
            localStorage.setItem('shopify_cart', JSON.stringify(action.payload))
        }
      )
      .addCase(
        removeItem.fulfilled,
        (state, action: PayloadAction<Cart | null>) => {
          state.cart = action.payload
          if (action.payload)
            localStorage.setItem('shopify_cart', JSON.stringify(action.payload))
        }
      )
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer
