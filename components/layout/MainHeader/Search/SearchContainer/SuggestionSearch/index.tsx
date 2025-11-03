'use client'

import { IcoClose } from '@/components/icons'
import { getCookie, setCookie } from '@/utils/set-cookie'
import { useEffect, useState } from 'react'

type Props = {
  isTyping: boolean
  onSelect: (term: string) => void
}

const SuggestionSearch = ({ isTyping, onSelect }: Props) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  const popularSearches = [
    'bags',
    'jeans',
    'jackets',
    'accessories',
    'sneakers',
  ]

  // Lấy dữ liệu từ cookie khi mount
  useEffect(() => {
    try {
      const raw = getCookie('recentSearches')
      if (raw) setRecentSearches(JSON.parse(raw))
    } catch {
      setRecentSearches([])
    }
  }, [])

  const onRemove = (term: string) => {
    const updated = recentSearches.filter((item) => item !== term)
    setRecentSearches(updated)
    setCookie('recentSearches', JSON.stringify(updated))
  }

  const displayList = isTyping
    ? []
    : recentSearches.length > 0
      ? recentSearches
      : popularSearches

  return (
    <div className="relative">
      <h3 className="font-medium text-3xl md:text-5xl text-gray-800 mb-2">
        {isTyping ? (
          <>
            <span className="font-[tangerine] font-bold pr-2">Search</span>
            <span className="uppercase font-light">suggestions</span>
          </>
        ) : recentSearches.length > 0 ? (
          <>
            <span className="font-[tangerine] font-bold pr-2">Recent</span>
            <span className="uppercase font-light">searches</span>
          </>
        ) : (
          <>
            <span className="uppercase font-light">Popular</span>
            <span className="font-[tangerine] font-bold px-2">Searches</span>
          </>
        )}
      </h3>

      {isTyping ? (
        <p className="text-sm text-gray-500">Keep typing to see results...</p>
      ) : (
        <ul className="space-y-2">
          {displayList.map((term) => (
            <li
              key={term}
              className="flex justify-between items-center text-gray-700 hover:text-orange-500 transition group"
            >
              <button
                onClick={() => onSelect(term)}
                className="flex-1 text-left"
              >
                {term}
              </button>

              {!isTyping && recentSearches.includes(term) && (
                <button
                  type="button"
                  onClick={() => onRemove(term)}
                  className="ml-2 cursor-pointer flex items-center justify-center"
                >
                  <IcoClose className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SuggestionSearch
