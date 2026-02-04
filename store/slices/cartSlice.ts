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
  loadingLineIds: string[]
}

const initialState: CartState = {
  cart: null,
  hydrated: false,
  loadingLineIds: [],
}

const startLineLoading = (state: CartState, lineId: string) => {
  if (!state.loadingLineIds.includes(lineId)) {
    state.loadingLineIds.push(lineId)
  }
}

const stopLineLoading = (state: CartState, lineId: string) => {
  state.loadingLineIds = state.loadingLineIds.filter((id) => id !== lineId)
}

const persistCart = (cart: Cart | null) => {
  if (cart) {
    localStorage.setItem('shopify_cart', JSON.stringify(cart))
  }
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
      .addCase(hydrateCart.fulfilled, (state, action) => {
        state.cart = action.payload
        state.hydrated = true

        if (action.payload) {
          localStorage.setItem('shopify_cart_id', action.payload.id)
        }
      })
      .addCase(hydrateCart.rejected, (state) => {
        state.hydrated = true
      })

      .addCase(addItem.fulfilled, (state, action) => {
        state.cart = action.payload
        persistCart(action.payload)
      })

      .addCase(updateItem.pending, (state, action) => {
        startLineLoading(state, action.meta.arg.lineId)
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const { lineId } = action.meta.arg
        state.cart = action.payload
        stopLineLoading(state, lineId)
        persistCart(action.payload)
      })
      .addCase(updateItem.rejected, (state, action) => {
        stopLineLoading(state, action.meta.arg.lineId)
      })

      .addCase(removeItem.pending, (state, action) => {
        startLineLoading(state, action.meta.arg)
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const lineId = action.meta.arg
        state.cart = action.payload
        stopLineLoading(state, lineId)
        persistCart(action.payload)
      })
      .addCase(removeItem.rejected, (state, action) => {
        stopLineLoading(state, action.meta.arg)
      })
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer
