'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GetPredictiveSearchQuery } from '@/shopify/types/graphql'
import Image from 'next/image'
import { SearchIcon } from '@/components/icons'

const Search = () => {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<
    NonNullable<GetPredictiveSearchQuery['predictiveSearch']>['products']
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      router.push(`/search-result?q=${encodeURIComponent(input.trim())}`)
    }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="q"
          className="w-full border rounded py-2 pl-2 pr-20 md:w-[700px]"
          placeholder="Enter product name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <span className="absolute right-1 top-1 p-2 bg-red-300 rounded">
          <SearchIcon />
        </span>
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
                <Image
                  src={product.featuredImage?.url || ''}
                  alt=""
                  width={100}
                  height={200}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search
