'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { parseFacetInput } from '../../CollectionPage/helper'
import { Facets } from '../../type'

interface IFilter {
  facets: Facets[]
}

const FilterItem = ({ facets }: IFilter) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const toggleFilter = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentValues = params.getAll(param)

    if (currentValues.includes(value)) {
      const nextValues = currentValues.filter((v) => v !== value)
      params.delete(param)
      nextValues.forEach((v) => params.append(param, v))
    } else {
      params.append(param, value)
    }

    router.push(`?${params.toString()}`, { scroll: false })
  }

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
                  // v.count !== 0 && (
                    <li
                      key={v.id}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFilter(param, value)}
                        className="cursor-pointer"
                      />

                      <span>{v.label}</span>
                      <span>({v.count})</span>

                      <span className="ml-auto text-gray-400">{v.count}</span>
                    </li>
                  )
                // )
              })}
            </ul>
          </div>
        )
      })}
    </aside>
  )
}

export default FilterItem
