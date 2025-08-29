'use client'
import { createContext, useState, ReactNode } from 'react'

interface CartUIContextType {
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

export const CartUIContext = createContext<CartUIContextType | undefined>(
  undefined
)

export const CartUIProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  // const openCart = () => {
  //   setTimeout(() => {
  //     setIsOpen(true);
  //   }, 1000);
  // };

  const openCart = () => setIsOpen(true)

  const closeCart = () => setIsOpen(false)

  return (
    <CartUIContext.Provider value={{ isOpen, openCart, closeCart }}>
      {children}
    </CartUIContext.Provider>
  )
}
