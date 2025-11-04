/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * 🔹 useDebounceValue
 * Dùng để debounce một giá trị (string, number, object, ...)
 * Trả về giá trị mới sau khi user dừng thay đổi trong `delay` ms.
 */
export function useDebounceValue<T>(value: T, delay = 300): T {
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
 * 🔹 useDebounceCallback
 * Dùng để debounce một hàm callback (ví dụ: gọi API, handle input, scroll,...)
 * Trả về 1 hàm đã được debounce (memoized và cleanup chuẩn).
 */
export function useDebounceCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay = 300
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const callbackRef = useRef(callback)

  // Cập nhật callback mới nhất
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

  // Cleanup khi unmount
  useEffect(() => cancel, [cancel])

  // ✅ Trả về cả 3 để linh hoạt hơn
  return Object.assign(debounced, { cancel, flush })
}
