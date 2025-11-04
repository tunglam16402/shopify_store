'use client'

import { mappingDiscountPrice } from '@/lib/helper'
import { GetPredictiveSearchQuery } from '@/shopify/types/graphql'
import clsx from 'clsx'
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
    const t = setTimeout(() => setVisible(true), 10)
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
    <div className="fixed  left-0 right-0 z-40" style={{ top }}>
      {/* Overlay */}
      <div
        className={clsx(
          'fixed inset-0 top-[var(--header-height,140px)] md:top-[var(--header-height,100px)] bg-black/40 transition-opacity duration-500',
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      <div
        className={clsx(
          'relative w-full bg-white shadow-lg transition-transform duration-500 ease-in-out',
          visible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
        )}
      >
        <div className="main-width h-[100vh] md:h-full">
          <div className='py-4'>
            <div className="flex flex-col md:flex-row gap-6 border-t border-sub-primary ">
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
                  onSelect={onSelect}
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
