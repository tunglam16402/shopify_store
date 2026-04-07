/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useDebounceValue
 * Used to debounce a value (string, number, object, ...)
 * Returns the new value after the user stops changing it during the ms `delay`.
 */
export function useDebounceValue<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * useDebounceCallback
 * Used to debounce a callback function (e.g., API call, input handle, scroll, etc.)
 * Returns a debounced function (memoized and properly cleaned up).
 */
export function useDebounceCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay = 300
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      callbackRef.current()
    }
  }, [])

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      cancel()
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    },
    [delay, cancel]
  )

  useEffect(() => cancel, [cancel])

  return Object.assign(debounced, { cancel, flush })
}
