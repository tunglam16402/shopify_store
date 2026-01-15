'use client'

import { useFilterProduct } from '@/lib/hooks/useFilterProduct'
import { useSearchParams } from 'next/navigation'
import { parseFacetInput } from '../../CollectionPage/helper'
import { Facets } from '../../type'

interface IFilter {
  facets: Facets[]
}

const FilterItem = ({ facets }: IFilter) => {
  const searchParams = useSearchParams()
  const { toggleValue } = useFilterProduct()

  return (
    <aside className="w-64 space-y-6">
      {facets.map((facet) => {
        if (facet.type !== 'LIST') return null

        return (
          <div key={facet.id}>
            <h4 className="font-medium mb-2">{facet.label}</h4>

            <ul className="space-y-1">
              {facet.values.map((v) => {
                const parsed = parseFacetInput(v.input)
                if (!parsed || !parsed.value) return null

                const { param, value } = parsed
                const checked = searchParams.getAll(param).includes(value)
                return (
                  v.count > 0 && (
                    <li key={v.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleValue(param, value)}
                      />
                      <span>
                        {v.label} ({v.count})
                      </span>
                    </li>
                  )
                )
              })}
            </ul>
          </div>
        )
      })}
    </aside>
  )
}

export default FilterItem
