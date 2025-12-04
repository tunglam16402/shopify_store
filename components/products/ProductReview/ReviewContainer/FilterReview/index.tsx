'use client'
import {
  IcoAgeRange,
  IcoMedia,
  IcoRating,
  IcoThumbUp
} from '@/components/icons'
import Select from '@/components/ui/Select'
import { useState } from 'react'

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

const FilterReview = () => {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-wrap md:flex-row gap-4 md:gap-6 mt-6">
      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Ratings"
        icon={<IcoRating className="w-5 h-5" />}
      />

      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Age Range"
        icon={<IcoAgeRange className="w-5 h-5" />}
      />

      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Recommeded"
        icon={<IcoThumbUp className="w-5 h-5" />}
      />

      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder="With media"
        icon={<IcoMedia className="w-5 h-5" />}
      />
    </div>
  )
}

export default FilterReview
