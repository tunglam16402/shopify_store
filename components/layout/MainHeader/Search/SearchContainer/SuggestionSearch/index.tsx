'use client'

import { IcoClose } from '@/components/icons'
import { getCookie, setCookie } from '@/utils/set-cookie'
import { memo, useEffect, useState } from 'react'

type Props = {
  isTyping: boolean
  predictiveTerms?: string[]
  onSelect: (term: string) => void
}

const SuggestionSearch = ({
  isTyping,
  onSelect,
  predictiveTerms = [],
}: Props) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const popularSearches = [
    'bags',
    'jeans',
    'jackets',
    'accessories',
    'sneakers',
  ]

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

  const hasPredictive = predictiveTerms.length > 0
  const hasRecent = recentSearches.length > 0

  let displayList
  if (isTyping) {
    displayList = hasPredictive ? predictiveTerms : popularSearches
  } else {
    displayList = hasRecent ? recentSearches : popularSearches
  }

  return (
    <div className="relative">
      <h3 className=" text-3xl md:text-4xl">
        {isTyping ? (
          hasPredictive ? (
            <>
              <span className="font-[tangerine] font-bold pr-2">Search</span>
              <span className="uppercase font-light">suggestions</span>
            </>
          ) : (
            <>
              <span className="uppercase font-light">Popular</span>
              <span className="font-[tangerine] font-bold px-2">Searches</span>
            </>
          )
        ) : hasRecent ? (
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

        <ul className="space-y-2 mt-2">
          {displayList.map((term) => (
            <li key={term} className="flex justify-between items-center">
              <button
                onClick={() => onSelect(term)}
                className="text-gray-700 hover:text-orange-500 transition text-left"
              >
                {term}
              </button>
              {!isTyping && recentSearches.includes(term) && (
                <button
                  type="button"
                  onClick={() => onRemove(term)}
                  className="ml-2 flex items-center justify-center"
                >
                  <IcoClose className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              )}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default memo(SuggestionSearch)
