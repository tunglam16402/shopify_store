'use client'

import { Provider } from 'react-redux'
import store from '@/store/store'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { useEffect } from 'react'
import { hydrateCart } from '@/store/thunks/cartThunk'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <HydrateCart>{children}</HydrateCart>
    </Provider>
  )
}

function HydrateCart({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(hydrateCart())
  }, [dispatch])

  return <>{children}</>
}
