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
    <aside className="mt-6 space-y-6">
      {facets.map((facet) => {
        if (facet.type !== 'LIST') return null

        return (
          <div key={facet.id} className="border-b pb-6">
            <p className="font-semibold text-lg mb-6">{facet.label}</p>

            <ul className="space-y-4">
              {facet.values.map((v) => {
                const parsed = parseFacetInput(v.input)
                if (!parsed || !parsed.value) return null

                const { param, value } = parsed
                const checked = searchParams.getAll(param).includes(value)
                return (
                  v.count > 0 && (
                    <li key={v.id}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleValue(param, value)}
                          className="h-[18px] rounded-sm w-[18px] accent-primary"
                        />
                        <span className={checked ? 'font-medium': "font-normal"}>
                          {v.label} ({v.count})
                        </span>
                      </label>
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
