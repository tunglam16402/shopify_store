'use client'

import { IcoSort } from '@/components/icons'
import Select from '@/components/ui/Select'
import React, { memo } from 'react'

const options = [
  { label: 'Most Relevant', value: 'relevant' },
  { label: 'Most Recent', value: 'newest' },
  { label: 'Highest Rating', value: 'high' },
  { label: 'Lowest Rating', value: 'low' },
  { label: 'Most Helpful', value: 'helpful' },
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
        value={[value]} 
        onChange={(v) => onChange(v[0])}
        placeholder="Sort by: Most Relevant"
        icon={<IcoSort className="w-5 h-5" />}
        className="w-full"
        multiple={false}
      />
    </div>
  )
}

export default memo(SortReview)
