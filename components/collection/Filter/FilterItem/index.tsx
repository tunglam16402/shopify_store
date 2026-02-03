'use client'

import { useSearchParams } from 'next/navigation'
import { CollectionFilterActions } from '@/lib/hooks/useFilterProduct'
import { parseFacetInput } from '../../CollectionPage/helper'
import { Facets } from '../../type'
import { IcoDown } from '@/components/icons'
import Dropdown from '@/components/ui/Dropdown'

interface IFilter {
  facets: Facets[]
  toggleValue: CollectionFilterActions['toggleValue']
}

const FilterItem = ({ facets, toggleValue }: IFilter) => {
  const searchParams = useSearchParams()

  return (
    <aside className="mt-6 space-y-6">
      {facets.map((facet) => {
        if (facet.type !== 'LIST') return null

        return (
          <Dropdown
            key={facet.id}
            title={facet.label}
            openIcon={<IcoDown className="h-5 w-5" />}
            closeIcon={<IcoDown className="h-5 w-5" />}
            className="pb-6 border-b-gray-200"
            defaultOpen={true}
          >
            <ul className="space-y-4 pt-6">
              {facet.values.map((v) => {
                const parsed = parseFacetInput(v.input)
                if (!parsed || !parsed.value || v.count === 0) return null

                const { param, value } = parsed
                const checked = searchParams.getAll(param).includes(value)
                return (
                  <li key={v.id}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleValue(param, value)}
                        className="h-[18px] w-[18px] rounded-sm accent-primary"
                      />
                      <span className={checked ? 'font-medium' : 'font-normal'}>
                        {v.label} ({v.count})
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </Dropdown>
        )
      })}
    </aside>
  )
}

export default FilterItem
