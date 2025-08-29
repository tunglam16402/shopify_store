
import { CartContext } from '@/context/cart/Provider'
import { CartUIContext } from '@/context/cart/UIContext'
import { useContext } from 'react'

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const useCartUI = () => {
  const context = useContext(CartUIContext)
  if (!context) {
    throw new Error('usecartui must be used within a cartuiprovider')
  }
  return context
}
