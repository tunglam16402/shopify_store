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

interface SelectedItem {
  key: string
  label: string
  value?: string
}

const SelectedFilter = ({ facets, globalPrice }: Props) => {
  const searchParams = useSearchParams()
  const { toggleValue, clearRange } = useFilterProduct()

  const selected = useMemo<SelectedItem[]>(() => {
    const items: SelectedItem[] = []

    facets.forEach((facet) => {
      if (facet.type !== 'LIST') return

      facet.values.forEach((v) => {
        const parsed = parseFacetInput(v.input)
        if (!parsed?.value) return

        const selectedValues = searchParams.getAll(parsed.param)
        if (!selectedValues.includes(parsed.value)) return

        items.push({
          key: `${parsed.param}:${parsed.value}`,
          label: v.label,
          value: parsed.value,
        })
      })
    })

    const priceFacet = globalPrice.find((f) => f.type === 'PRICE_RANGE')
    if (priceFacet?.values?.[0]?.input) {
      try {
        const { price } = JSON.parse(priceFacet.values[0].input)
        const globalMin = price?.min
        const globalMax = price?.max

        const min = searchParams.get('price_min')
        const max = searchParams.get('price_max')

        if (
          (min && Number(min) !== globalMin) ||
          (max && Number(max) !== globalMax)
        ) {
          items.push({
            key: 'price',
            label: `Price: ${min ?? globalMin} - ${max ?? globalMax}`,
          })
        }
      } catch {}
    }

    return items
  }, [facets, globalPrice, searchParams])

  if (selected.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {selected.map((item) => (
        <button
          key={item.key}
          className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm"
          onClick={() => {
            if (item.key === 'price') {
              clearRange({ min: 'price_min', max: 'price_max' })
            } else {
              const [param, value] = item.key.split(':')
              toggleValue(param, value)
            }
          }}
        >
          {item.label}
          <span className="ml-1 text-gray-400">×</span>
        </button>
      ))}
    </div>
  )
}

export default SelectedFilter
