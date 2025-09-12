import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'

const loadState = () => {
  if (typeof window === 'undefined') return undefined
  try {
    const saved = localStorage.getItem('user')
    return saved ? { user: JSON.parse(saved) } : undefined
  } catch (error) {
    console.error('Failed to parse user state from localStorage', error)
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  preloadedState: loadState(),
})

let saveTimeout: NodeJS.Timeout

store.subscribe(() => {
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    try {
      const state = store.getState()
      localStorage.setItem('user', JSON.stringify(state.user))
    } catch (error) {
      console.error('Failed to save user state', error)
    }
  }, 300)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
