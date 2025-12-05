'use client'

import { IcoClose } from '@/components/icons'
import { ageOptions, ratingOptions, recommendOptions } from '..'
import { ReviewFilter } from '../../../type'

type FilterProbs = {
  field: keyof ReviewFilter
  label: string
  value: string
}

interface SelectedFiltersProps {
  filters: ReviewFilter
  removeFilter: (field: keyof ReviewFilter, value: string) => void
  clearAll: () => void
  getLabels: (
    field: keyof ReviewFilter,
    options: { label: string; value: string }[]
  ) => FilterProbs[]
}

const SelectedFilters = ({
  removeFilter,
  clearAll,
  getLabels,
}: SelectedFiltersProps) => {
  const selectedFilters: FilterProbs[] = [
    ...getLabels('rating', ratingOptions),
    ...getLabels('age', ageOptions),
    ...getLabels('recommend', recommendOptions),
  ]

  if (selectedFilters.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 items-center font-medium">
      {selectedFilters.map((f) => (
        <div
          key={f.field + f.value}
          className="flex items-center gap-2 bg-gray-200 text-gray-800 py-1.5  px-4 rounded-full"
        >
          <span>{f.label}</span>
          <button
            onClick={() => removeFilter(f.field, f.value)}
            className="flex items-center justify-center hover:opacity-70"
          >
            <IcoClose className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        onClick={clearAll}
        className="text-sm md:text-base underline hover:opacity-70"
      >
        Clear All
      </button>
    </div>
  )
}

export default SelectedFilters
