'use client'

import { IcoClose } from '@/components/icons'
import { getProductsByWidget } from '@/shopify/utils/get-product-by-widget'
import { getCookie, setCookie } from '@/utils/set-cookie'
import { memo, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

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

  const { data: popularProducts = [] } = useSWR(
    ['products', 'bestseller'],
    () => getProductsByWidget('bestseller'),
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60,
    }
  )

  const popularSearches = useMemo(
    () => popularProducts.slice(0, 6).map((p) => p.title),
    [popularProducts]
  )

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
      <h3 className="text-3xl md:text-4xl">
        {isTyping ? (
          hasPredictive ? (
            <>
              <span className="font-sub-heading pr-2 font-bold">Search</span>
              <span className="font-light uppercase">suggestions</span>
            </>
          ) : (
            <>
              <span className="font-light uppercase">Popular</span>
              <span className="font-sub-heading px-2 font-bold">Searches</span>
            </>
          )
        ) : hasRecent ? (
          <>
            <span className="font-sub-heading pr-2 font-bold">Recent</span>
            <span className="font-light uppercase">searches</span>
          </>
        ) : (
          <>
            <span className="font-light uppercase">Popular</span>
            <span className="font-sub-heading px-2 font-bold">Searches</span>
          </>
        )}
      </h3>

      <ul className="mt-2 space-y-2">
        {displayList.map((term) => (
          <li key={term} className="flex items-center justify-between">
            <button
              onClick={() => onSelect(term)}
              className="text-left text-gray-700 transition hover:text-orange-500"
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
