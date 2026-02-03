'use client'

import { Provider } from 'react-redux'
import store from '@/store/store'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { useEffect } from 'react'
import { hydrateCart } from '@/store/thunks/cartThunk'
import { loadUserFromCookie } from '@/store/slices/userSlice'
import { useAppSelector } from '@/lib/hooks/useAppSelector'
import { EventTracking, sendEventTracking } from '@/lib/analytics/klaviyo'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <HydrateCart>
        <GetCustomer>{children}</GetCustomer>
      </HydrateCart>
    </Provider>
  )
}

function HydrateCart({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(hydrateCart({}))
  }, [dispatch])

  return <>{children}</>
}

function GetCustomer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(loadUserFromCookie())
  }, [dispatch])

  useEffect(() => {
    if (!user?.customer?.email) return

    sendEventTracking(EventTracking.TrackLoggedUsers, {
      email: user.customer.email,
    })
  }, [user?.customer?.email])

  return <>{children}</>
}
