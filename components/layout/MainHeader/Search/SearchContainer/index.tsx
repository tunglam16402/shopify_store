'use client'

import { mappingDiscountPrice } from '@/lib/helper'
import { GetPredictiveSearchQuery } from '@/shopify/types/graphql'
import cn from 'classnames'
import { memo, useEffect, useMemo, useState } from 'react'
import SuggestionSearch from './SuggestionSearch'
import SuggestionProducts from './SugggestionProducts'

type Props = {
  input: string
  suggestions: NonNullable<
    GetPredictiveSearchQuery['predictiveSearch']
  >['products']
  onSelect: (term: string) => void
  onClose: () => void
  top: number
}

const SearchContainer = ({
  input,
  suggestions,
  onSelect,
  onClose,
  top,
}: Props) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => setVisible(true), 100)

    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  const isTyping = useMemo(() => input.trim().length > 0, [input])

  const mappedProducts = useMemo(
    () => suggestions.map(mappingDiscountPrice),
    [suggestions]
  )

  const mappedQueries = useMemo(
    () => suggestions.map((q) => q.title),
    [suggestions]
  )

  return (
    <div
      className="fixed left-0 right-0 z-40"
      style={{ top }}
      id="search-container"
    >
      <div
        className={cn(
          'fixed inset-0 top-(--header-height,160px) md:top-(--header-height,100px) bg-black/40 transition-opacity duration-500 ',
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'relative w-full bg-white shadow-lg transition-transform duration-500 ease-in-out',
          visible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
        )}
      >
        <div className="layout-width h-dvh md:h-full">
          <div className="py-6">
            <div className="flex flex-col md:flex-row gap-8 border-t border-sub-primary ">
              <div className="flex-4 min-w-[250px] mt-4">
                <SuggestionSearch
                  isTyping={isTyping}
                  predictiveTerms={mappedQueries}
                  onSelect={onSelect}
                />
              </div>

              <div className="flex-6 min-w-[250px] md:mt-4">
                <SuggestionProducts
                  isTyping={isTyping}
                  predictiveProducts={mappedProducts}
                  onClose={onClose}
                  inputValue={input}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(SearchContainer)
