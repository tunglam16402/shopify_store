'use client'

import { IcoSort } from '@/components/icons'
import Select from '@/components/ui/Select'
import React, { useState } from 'react'
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

const SortReview = () => {
  const [value, setValue] = useState('')

  return (
    <div className='mt-4 md:mt-0'>
      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Sort by: Most revelant"
        icon={<IcoSort className="w-5 h-5" />}
        className='w-full'
      />
    </div>
  )
}

export default SortReview
