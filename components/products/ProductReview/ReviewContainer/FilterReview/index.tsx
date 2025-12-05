'use client'

import {
  IcoAgeRange,
  IcoMedia,
  IcoRating,
  IcoThumbUp,
} from '@/components/icons'
import Select from '@/components/ui/Select'
import { memo } from 'react'
import { ReviewFilter } from '../../type'
import SelectedFilters from './SelectedFilter'

export const ratingOptions = [
  { label: '5 Stars', value: '5' },
  { label: '4 Stars', value: '4' },
  { label: '3 Stars', value: '3' },
  { label: '2 Stars', value: '2' },
  { label: '1 Star', value: '1' },
]

export const ageOptions = [
  { label: '17 or under', value: '<18' },
  { label: '18 to 25', value: '18-25' },
  { label: '26 to 35', value: '26-35' },
  { label: '36 to 45', value: '36-45' },
  { label: '46 to 55', value: '46-55' },
  { label: '56 or over', value: '56+' },
]

export const recommendOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]

interface FilterReviewProps {
  filters: ReviewFilter
  setFilters: React.Dispatch<React.SetStateAction<ReviewFilter>>
}

const FilterReview = ({ filters, setFilters }: FilterReviewProps) => {
  const getLabels = (
    field: keyof ReviewFilter,
    options: { label: string; value: string }[]
  ) => {
    const values = filters[field] as string[] | undefined
    if (!values || values.length === 0) return []
    return options
      .filter((o) => values.includes(o.value))
      .map((o) => ({ field, label: o.label, value: o.value }))
  }

  const removeFilter = (field: keyof ReviewFilter, value?: string) => {
    setFilters((prev) => {
      return {
        ...prev,
        [field]: (prev[field] as string[]).filter((v) => v !== value),
      }
    })
  }

  const clearAll = () => setFilters({})
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap md:flex-row gap-4 md:gap-6 mt-6">
        <Select
          options={ratingOptions}
          value={filters.rating || []}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              rating: value,
            }))
          }
          placeholder="Ratings"
          icon={<IcoRating className="w-5 h-5" />}
        />

        <Select
          options={ageOptions}
          value={filters.age || []}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              age: value,
            }))
          }
          placeholder="Age Range"
          icon={<IcoAgeRange className="w-5 h-5" />}
        />

        <Select
          options={recommendOptions}
          value={filters.recommend || []}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              recommend: value,
            }))
          }
          placeholder="Recommended"
          icon={<IcoThumbUp className="w-5 h-5" />}
        />

        <label className="border border-gray-400 rounded-lg px-4 py-2 gap-4 md:gap-8 flex items-center justify-between cursor-pointer">
          <span className="flex items-center gap-2">
            <IcoMedia className="w-5 h-5" />
            With media
          </span>
          <input
            type="checkbox"
            checked={filters.withMedia === true}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                withMedia: e.target.checked ? true : undefined,
              }))
            }
            className="w-5 h-5"
          />
        </label>
      </div>
      <div className="mt-8">
        <SelectedFilters
          filters={filters}
          removeFilter={removeFilter}
          clearAll={clearAll}
          getLabels={getLabels}
        />
      </div>
    </div>
  )
}

export default memo(FilterReview)
