'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { GetPredictiveSearchQuery } from '@/shopify/types/graphql'
import { IcoClose, SearchIcon } from '@/components/icons'
import SearchContainer from '../SearchContainer'
import { getCookie, setCookie } from '@/utils/set-cookie'
import { useDebounceCallback } from '@/shopify/hooks/useDebounce'

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

  const saveRecentSearch = useCallback((term: string) => {
    const raw = getCookie('recentSearches')
    let existing: string[] = []
    try {
      existing = raw ? JSON.parse(raw) : []
    } catch {
      existing = []
    }

    const updated = [term, ...existing.filter((t) => t !== term)].slice(
      0,
      MAX_RECENT
    )
    setCookie('recentSearches', JSON.stringify(updated), {
      path: '/',
      expires: 30,
    })
  }, [])

  const fetchPredictiveSearch = useCallback(async (term: string) => {
    if (term.length < 2) {
      setSuggestions([])
      return
    }
    try {
      const res = await fetch(
        `/api/predictive-search?q=${encodeURIComponent(term)}`
      )
      const json = await res.json()
      setSuggestions(json.products)
    } catch (error) {
      console.error('Predictive search error:', error)
      setSuggestions([])
    }
  }, [])

  // Debounce callback (delay 400ms)
  const debouncedSearch = useDebounceCallback(fetchPredictiveSearch, 400)

  useEffect(() => {
    if (input.trim()) debouncedSearch(input)
    else setSuggestions([])
  }, [input, debouncedSearch])

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
    debouncedSearch.cancel()
    saveRecentSearch(term)
    router.push(`/search-result?q=${encodeURIComponent(term)}`)
    setIsOpen(false)
  }

  const handleSelect = (term: string) => {
    debouncedSearch.cancel()
    setInput(term)
    saveRecentSearch(term)
    router.push(`/search-result?q=${encodeURIComponent(term)}`)
    setIsOpen(false)
  }

  const clearInputValue = () => {
    setInput('')
  }

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(e: MouseEvent) {
      const inputEl = inputRef.current
      const containerEl = document.getElementById('search-container')

      if (
        inputEl?.contains(e.target as Node) ||
        containerEl?.contains(e.target as Node)
      ) {
        return
      }

      setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div ref={inputRef} className="relative w-full md:w-[480px] lg:w-[700px]">
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
          className={`relative w-full transition-all flex items-center duration-300 ${
            isOpen ? 'ml-10 md:ml-0' : ''
          }`}
        >
          <input
            type="text"
            name="q"
            className="w-full border focus:border-[#7c0214] rounded-md py-2.5 pl-2 pr-10"
            placeholder="Enter product name..."
            value={input}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          {input.length > 0 && (
            <button
              type="button"
              onClick={clearInputValue}
              className="absolute right-12 p-1.5 text-center text-sm text-gray-600 underline"
            >
              Clear
            </button>
          )}
          <button
            className="absolute right-1.5 p-2 bg-primary rounded hover:opacity-80 cursor-pointer"
            onClick={handleSubmit}
          >
            <SearchIcon />
          </button>
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
