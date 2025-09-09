'use client'
import { createContext, useState, ReactNode, useCallback } from 'react'

interface UIState {
  [key: string]: boolean
}

interface GlobalUIContextType {
  isOpen: (key: string) => boolean
  open: (key: string) => void
  close: (key: string) => void
  toggle: (key: string) => void
}

export const GlobalUIContext = createContext<GlobalUIContextType | undefined>(
  undefined
)

export const GlobalUIProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<UIState>({})

  const open = useCallback((key: string) => {
    setState((prev) => ({ ...prev, [key]: true }))
  }, [])

  const close = useCallback((key: string) => {
    setState((prev) => ({ ...prev, [key]: false }))
  }, [])

  const toggle = useCallback((key: string) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const isOpen = useCallback((key: string) => !!state[key], [state])

  return (
    <GlobalUIContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </GlobalUIContext.Provider>
  )
}
