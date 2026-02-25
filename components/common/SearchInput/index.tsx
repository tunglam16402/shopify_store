'use client'

import { IcoClose, SearchIcon } from '@/components/icons'
import { useDebounceValue } from '@/shopify/hooks/useDebounce'
import { useEffect, useRef, useState, useEffectEvent } from 'react'

interface SearchInputProps {
  value: string
  onSearch: (keyword: string) => void
  placeholder?: string
  debounceMs?: number
  className?: string
}

const SearchInput = ({
  value,
  onSearch,
  placeholder = 'Search...',
  debounceMs = 500,
  className = '',
}: SearchInputProps) => {
  const [input, setInput] = useState(value)
  const debouncedKeyword = useDebounceValue(input, debounceMs)

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

  return (
    <div className={className}>
      <div className="relative flex items-center max-w-lg">
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-9 text-sm focus:border-black focus:outline-none"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />

        <div className="absolute left-2">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>

        {input.length > 0 && (
          <button
            type="button"
            onClick={() => setInput('')}
            className="absolute right-2 rounded p-1 hover:bg-gray-100"
          >
            <IcoClose className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchInput