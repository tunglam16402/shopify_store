'use client'
import { useContext, useCallback } from 'react'
import { GlobalUIContext } from '@/context/GlobalUI'

// Hook lấy context gốc
export const useGlobalUI = () => {
  const context = useContext(GlobalUIContext)
  if (!context) {
    throw new Error('useGlobalUI must be used within a GlobalUIProvider')
  }
  return context
}

// Hook tiện lợi cho từng modal/cart theo key
export const useUI = (key: string) => {
  const context = useGlobalUI()

  const open = useCallback(() => context.open(key), [context, key])
  const close = useCallback(() => context.close(key), [context, key])
  const toggle = useCallback(() => context.toggle(key), [context, key])
  const isOpen = context.isOpen(key)

  return { open, close, toggle, isOpen }
}
