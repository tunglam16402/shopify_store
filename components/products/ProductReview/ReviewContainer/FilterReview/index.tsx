'use client'

import {
  IcoAgeRange,
  IcoMedia,
  IcoRating,
  IcoThumbUp,
} from '@/components/icons'
import Select from '@/components/ui/Select'
import { memo } from 'react'

const ratingOptions = [
  { label: '5 Stars', value: '5' },
  { label: '4 Stars', value: '4' },
  { label: '3 Stars', value: '3' },
  { label: '2 Stars', value: '2' },
  { label: '1 Star', value: '1' },
]

const ageOptions = [
  { label: '< 18', value: '<18' },
  { label: '18-25', value: '18-25' },
  { label: '26-35', value: '26-35' },
  { label: '36-45', value: '36-45' },
  { label: '46-55', value: '46-55' },
  { label: '60+', value: '60+' },
]

const recommendOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]

interface FilterReviewProps {
  filters: any
  setFilters: (v: any) => void
}

const FilterReview = ({ filters, setFilters }: FilterReviewProps) => {

  console.log('filters :>> ', filters);
  return (
    <div className="flex flex-wrap md:flex-row gap-4 md:gap-6 mt-6">
      {/* Rating Multiple */}
      <Select
        options={ratingOptions}
        value={filters.rating || []}
        onChange={(value) =>
          setFilters((prev: any) => ({
            ...prev,
            rating: value,
          }))
        }
        placeholder="Ratings"
        icon={<IcoRating className="w-5 h-5" />}
      />

      {/* Age Multiple */}
      <Select
        options={ageOptions}
        value={filters.age || []}
        onChange={(value) =>
          setFilters((prev: any) => ({
            ...prev,
            age: value,
          }))
        }
        placeholder="Age Range"
        icon={<IcoAgeRange className="w-5 h-5" />}
      />

      {/* Recommend Multiple */}
      <Select
        options={recommendOptions}
        value={filters.recommend || []}
        onChange={(value) =>
          setFilters((prev: any) => ({
            ...prev,
            recommend: value,
          }))
        }
        placeholder="Recommended"
        icon={<IcoThumbUp className="w-5 h-5" />}
      />

      {/* With Media */}
      <label className="border border-gray-400 rounded-lg px-4 py-2 gap-4 md:gap-8 flex items-center justify-between cursor-pointer">
        <span className="flex items-center gap-2">
          <IcoMedia className="w-5 h-5" />
          With media
        </span>
        <input
          type="checkbox"
          checked={filters.withMedia === true}
          onChange={(e) =>
            setFilters((prev: any) => ({
              ...prev,
              withMedia: e.target.checked ? true : undefined,
            }))
          }
          className="w-5 h-5"
        />
      </label>
    </div>
  )
}

export default memo(FilterReview)
