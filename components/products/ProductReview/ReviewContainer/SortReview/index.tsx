'use client'

import { IcoSort } from '@/components/icons'
import Select from '@/components/ui/Select'
import React from 'react'

const options = [
  { label: 'Most relevant', value: 'relevance' },
  { label: 'Newest', value: 'newest' },
  { label: 'Highest rating', value: 'high' },
  { label: 'Lowest rating', value: 'low' }
]

interface SortReviewProps {
  value: string
  onChange: (value: string) => void
}

const SortReview: React.FC<SortReviewProps> = ({ value, onChange }) => {
  return (
    <div className="mt-4 md:mt-0">
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder="Sort by: Most relevant"
        icon={<IcoSort className="w-5 h-5" />}
        className="w-full"
      />
    </div>
  )
}

export default SortReview
