// components/OrientationLock.tsx
'use client'

import { useEffect } from 'react'

export function OrientationLock() {
  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await (
          screen.orientation as unknown as ScreenOrientation & {
            lock: (orientation: string) => Promise<void>
          }
        ).lock('landscape')
      } catch (err) {
        // fallback: not supported on all browsers/desktop
        console.warn('Orientation lock not supported:', err)
      }
    }
    void lockOrientation()

    return () => {
      screen.orientation.unlock()
    }
  }, [])

  return null
}
