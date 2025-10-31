'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { GetPredictiveSearchQuery } from '@/shopify/types/graphql'
import { SearchIcon } from '@/components/icons'
import SearchContainer from '../SearchContainer'

const SearchInput = () => {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<
    NonNullable<GetPredictiveSearchQuery['predictiveSearch']>['products']
  >([])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Gọi predictive search
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (input.length >= 2) {
        try {
          const res = await fetch(`/api/predictive-search?q=${encodeURIComponent(input)}`)
          const json = await res.json()
          setSuggestions(json.products)
        } catch (error) {
          console.error('Client predictive search error:', error)
          setSuggestions([])
        }
      } else {
        setSuggestions([])
      }
    }, 400)
    return () => clearTimeout(timeout)
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      router.push(`/search-result?q=${encodeURIComponent(input.trim())}`)
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full md:w-[700px]">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="q"
          className="w-full border rounded py-2 pl-2 pr-20"
          placeholder="Enter product name..."
          value={input}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <span className="absolute right-1 top-1 p-2 bg-orange-300 rounded">
          <SearchIcon />
        </span>
      </form>

      {isOpen && (
        <SearchContainer
          input={input}
          suggestions={suggestions}
          onSelect={(term) => {
            setInput(term)
            router.push(`/search-result?q=${encodeURIComponent(term)}`)
            setIsOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default SearchInput
