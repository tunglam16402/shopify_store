'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { PredictiveSearchQuery } from '@/types/shopify/graphql'

const SearchBox = () => {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<
    NonNullable<PredictiveSearchQuery['predictiveSearch']>['products']
  >([])

  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (input.length >= 2) {
        try {
          const res = await fetch(
            `/api/predictive-search?q=${encodeURIComponent(input)}`
          )
          const json = await res.json()
          setSuggestions(json.products)
        } catch (error) {
          console.error('Client predictive search error:', error)
          setSuggestions([])
        }
      } else {
        setSuggestions([])
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [input])

  console.log('suggestions :>> ', input)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Tìm sản phẩm..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border shadow-md w-full mt-1 rounded max-h-60 overflow-y-auto gid grid-row-s">
          {suggestions.map((product) => (
            <li key={product.id}>
              <Link
                href={`/products/${product.handle}`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBox
