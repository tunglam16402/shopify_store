'use client'

import { IcoClose, SearchIcon } from '@/components/icons'
import { useDebounceValue } from '@/shopify/hooks/useDebounce'
import { useState, useEffect, useRef, useEffectEvent } from 'react'

interface SearchReviewProps {
  value: string
  onSearch: (keyword: string) => void
}

const SearchReview = ({ value, onSearch }: SearchReviewProps) => {
  const [input, setInput] = useState(value)
  const debouncedKeyword = useDebounceValue(input, 500)

  const onSearchEvent = useEffectEvent(onSearch)

  const firstRun = useRef(true)

  useEffect(() => {
    setInput(value)
  }, [value])

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }

    onSearchEvent(debouncedKeyword.trim())
  }, [debouncedKeyword])

  const clearInputValue = () => setInput('')

  return (
    <div className="max-w-lg w-full">
      <div className="relative flex items-center">
        <div className="relative w-full flex items-center transition-all duration-300">
          <input
            type="text"
            className="w-full border border-gray-400 focus:border-primary rounded-md py-2 px-9"
            placeholder="Search reviews..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />

          {input.length > 0 && (
            <button
              type="button"
              className="absolute right-1 p-2 rounded hover:opacity-80"
              onClick={clearInputValue}
            >
              <IcoClose className="text-primary w-5 h-5" />
            </button>
          )}

          <div className="absolute left-0 p-2">
            <SearchIcon className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchReview
