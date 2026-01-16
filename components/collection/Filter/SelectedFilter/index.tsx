'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { useFilterProduct } from '@/lib/hooks/useFilterProduct'
import { Facets } from '../../type'
import { parseFacetInput } from '../../CollectionPage/helper'

interface Props {
  facets: Facets[]
  globalPrice: Facets[]
}

const SelectedFilter = ({ facets, globalPrice }: Props) => {
  const searchParams = useSearchParams()
  const { toggleValue, clearRange, clearAll } = useFilterProduct()

  const { listGroups, price } = useMemo(() => {
    const listGroups: Record<
      string,
      {
        label: string
        items: { label: string; param: string; value: string }[]
      }
    > = {}

    facets.forEach((facet) => {
      if (facet.type !== 'LIST') return

      facet.values.forEach((v) => {
        const parsed = parseFacetInput(v.input)
        if (!parsed?.value) return

        if (!searchParams.getAll(parsed.param).includes(parsed.value)) return

        listGroups[parsed.param] ??= {
          label: facet.label,
          items: [],
        }

        listGroups[parsed.param].items.push({
          label: v.label,
          param: parsed.param,
          value: parsed.value,
        })
      })
    })

    let price: { min: number; max: number } | null = null

    const priceFacet = globalPrice.find((f) => f.type === 'PRICE_RANGE')
    if (priceFacet?.values?.[0]?.input) {
      try {
        const { price: global } = JSON.parse(priceFacet.values[0].input)
        const min = Number(searchParams.get('price_min') ?? global.min)
        const max = Number(searchParams.get('price_max') ?? global.max)

        if (min !== global.min || max !== global.max) {
          price = { min, max }
        }
      } catch {}
    }

    return { listGroups, price }
  }, [facets, globalPrice, searchParams])

  const hasSelectedFilters = Object.keys(listGroups).length > 0 || !!price

  return (
    <div className="flex flex-col flex-wrap ">
      {Object.values(listGroups).map((group) => (
        <div key={group.label} className="space-x-2">
          <span className="font-medium mr-2 text-sm md:text-base">
            {group.label}:
          </span>

          {group.items.map((item) => (
            <button
              key={item.value}
              className="inline-flex items-center gap-1 gap- rounded-full border px-2 py-1 mt-2"
              onClick={() => toggleValue(item.param, item.value)}
            >
              {item.label}
              <span className="text-gray-400">×</span>
            </button>
          ))}
        </div>
      ))}

      {price && (
        <div className="mt-2">
          <span className="font-medium mr-2 text-sm md:text-base">Price:</span>
          <button
            className="inline-flex items-center gap-1 rounded-full border px-3 py-1"
            onClick={() => clearRange({ min: 'price_min', max: 'price_max' })}
          >
            {price.min} – {price.max}
            <span className="text-gray-400">×</span>
          </button>
        </div>
      )}

      {hasSelectedFilters && (
        <div>
          <button
            onClick={() => clearAll()}
            className="mt-2 underline text-gray-500 hover:text-black"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}

export default SelectedFilter
