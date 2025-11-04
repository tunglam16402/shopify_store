'use client'

import ProductCard from '@/components/products/ProductCard'
import { GetPredictiveSearchQuery } from '@/shopify/types/graphql'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import SuggestionSearch from './SuggestionSearch'
import SuggestionProducts from './SugggestionProducts'
import { mappingDiscountPrice } from '@/lib/helper'

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

  console.log('suggestions :>> ', suggestions)

  useEffect(() => {
    setVisible(true)
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const isTyping = input.trim().length > 0
  const hasResults = suggestions.length > 0

  const mappedSuggestions = hasResults
    ? suggestions.map(mappingDiscountPrice)
    : []

  return (
    <div className="fixed left-0 right-0 z-40" style={{ top }}>
      <div
        className={clsx(
          'fixed inset-0 top-[var(--header-height,140px)] md:top-[var(--header-height,100px)] bg-black/40 transition-opacity duration-600',
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Container */}
      <div
        className={clsx(
          'relative w-full bg-white shadow-lg transition-transform duration-600 ease-in-out',
          visible ? 'translate-y-0' : '-translate-y-5 opacity-0'
        )}
      >
        <div className="main-width">
          <div className='py-4'>
            {hasResults ? (
              <div className="divide-y">
                {mappedSuggestions.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showCTA={false}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-6 border-t border-sub-primary">
                <div className="flex-4 min-w-[250px] mt-4">
                  <SuggestionSearch isTyping={isTyping} onSelect={onSelect} />
                </div>
                <div className="flex-6 min-w-[250px] md:mt-4">
                  <SuggestionProducts isTyping={isTyping} onSelect={onSelect} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchContainer
