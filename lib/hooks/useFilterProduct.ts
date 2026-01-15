'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useFilterProduct() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const push = useCallback(
    (params: URLSearchParams) => {
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router]
  )

  const toggleValue = useCallback(
    (param: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      const values = params.getAll(param)

      params.delete(param)

      if (!values.includes(value)) {
        ;[...values, value].forEach((v) => params.append(param, v))
      } else {
        values
          .filter((v) => v !== value)
          .forEach((v) => params.append(param, v))
      }

      push(params)
    },
    [searchParams, push]
  )

  const setRange = useCallback(
    (
      keys: { min: string; max: string },
      value: { min: number; max: number },
      defaults: { min: number; max: number }
    ) => {
      const params = new URLSearchParams(searchParams)

      const isDefault = value.min === defaults.min && value.max === defaults.max

      if (isDefault) {
        params.delete(keys.min)
        params.delete(keys.max)
      } else {
        params.set(keys.min, String(value.min))
        params.set(keys.max, String(value.max))
      }

      push(params)
    },
    [searchParams, push]
  )

  const clearRange = useCallback(
    (keys: { min: string; max: string }) => {
      const params = new URLSearchParams(searchParams)
      params.delete(keys.min)
      params.delete(keys.max)
      push(params)
    },
    [searchParams, push]
  )

  return {
    toggleValue,
    setRange,
    clearRange,
  }
}
