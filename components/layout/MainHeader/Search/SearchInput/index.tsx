'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { GetPredictiveSearchQuery } from '@/shopify/types/graphql'
import { IcoClose, SearchIcon } from '@/components/icons'
import SearchContainer from '../SearchContainer'
import { getCookie, setCookie } from '@/utils/set-cookie'

const MAX_RECENT = 5

const SearchInput = () => {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<
    NonNullable<GetPredictiveSearchQuery['predictiveSearch']>['products']
  >([])
  const [isOpen, setIsOpen] = useState(false)
  const [containerTop, setContainerTop] = useState(0)
  const inputRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 🔹 Lưu từ khóa vào cookie (tối đa 5)
  const saveRecentSearch = (term: string) => {
    const raw = getCookie('recentSearches')
    let existing: string[] = []

    try {
      existing = raw ? JSON.parse(raw) : []
    } catch {
      existing = []
    }

    const updated = [term, ...existing.filter((t) => t !== term)].slice(0, MAX_RECENT)
    setCookie('recentSearches', JSON.stringify(updated), { path: '/', expires: 30 })
  }

  // 🔹 Predictive search fetch
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (input.length >= 2) {
        try {
          const res = await fetch(`/api/predictive-search?q=${encodeURIComponent(input)}`)
          const json = await res.json()
          setSuggestions(json.products)
        } catch (error) {
          console.error('Predictive search error:', error)
          setSuggestions([])
        }
      } else {
        setSuggestions([])
      }
    }, 400)
    return () => clearTimeout(timeout)
  }, [input])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setContainerTop(rect.bottom)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const term = input.trim()
    if (!term) return
    saveRecentSearch(term)
    router.push(`/search-result?q=${encodeURIComponent(term)}`)
    setIsOpen(false)
  }

  const handleSelect = (term: string) => {
    setInput(term)
    saveRecentSearch(term)
    router.push(`/search-result?q=${encodeURIComponent(term)}`)
    setIsOpen(false)
  }

  return (
    <div ref={inputRef} className="relative w-full md:w-[700px]">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        {isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute md:hidden flex items-center justify-center"
          >
            <IcoClose className="h-6 w-6 text-gray-600" />
          </button>
        )}

        <div
          className={`relative w-full transition-all duration-300 ${
            isOpen ? 'ml-10 md:ml-0' : ''
          }`}
        >
          <input
            type="text"
            name="q"
            className="w-full border rounded py-2 pl-2 pr-10"
            placeholder="Enter product name..."
            value={input}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <span className="absolute right-1 top-1.5 p-1.5 bg-orange-300 rounded">
            <SearchIcon />
          </span>
        </div>
      </form>

      {isOpen && (
        <SearchContainer
          input={input}
          suggestions={suggestions}
          onClose={() => setIsOpen(false)}
          onSelect={handleSelect}
          top={containerTop}
        />
      )}
    </div>
  )
}

export default SearchInput
