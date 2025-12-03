'use client'
import { IcoFilter, IcoSort } from '@/components/icons'
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
    <div className='flex items-center gap-4 md:gap-6 max-w-lg w-full mt-4 md:mt-0'>
      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Filter"
        icon={<IcoFilter className='w-5 h-5'/>}
      />

      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Sort"
        icon={<IcoSort className='w-5 h-5'/>}

      />
    </div>
  )
}

export default FilterReview
