import { IcoSort } from '@/components/icons'
import Select from '@/components/ui/Select'
import React from 'react'

const dateRangeOptions = [
  { label: 'Anytime', value: 'anytime' },
  { label: 'Last 30 days', value: 'last30days' },
  { label: 'Last 6 months', value: 'last6months' },
  { label: '2026', value: '2026' },
  { label: '2025', value: '2025' },
  { label: '2024', value: '2024' },
]

const statusOptions = [
  { label: 'Most Relevant', value: 'relevant' },
  { label: 'Most Recent', value: 'newest' },
  { label: 'Highest Rating', value: 'high' },
  { label: 'Lowest Rating', value: 'low' },
  { label: 'Most Helpful', value: 'helpful' },
]

interface IOrderSort {
  value: string
  onChange: (value: string) => void
}

const OrderSort = ({value, onChange} : IOrderSort) => {
  return (
    <div>
      <Select
        options={dateRangeOptions}
        value={[value]}
        onChange={(v) => onChange(v[0])}
        placeholder="Sort by: Most Relevant"
        icon={<IcoSort className="h-5 w-5" />}
        className="w-full"
        multiple={false}
      />

    </div>
  )
}

export default OrderSort
