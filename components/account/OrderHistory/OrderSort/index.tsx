import { IcoSort } from '@/components/icons'
import Select from '@/components/ui/Select'
import React from 'react'
import { OrderSortValue } from '../helper'

const sortOptions = [
  { label: 'Newest first', value: 'date-desc' },
  { label: 'Oldest first', value: 'date-asc' },
  { label: 'Status A → Z', value: 'status-asc' },
  { label: 'Status Z → A', value: 'status-desc' },
]

interface IOrderSort {
  value: OrderSortValue
  onChange: (value: OrderSortValue) => void
  className?: string
}

const OrderSort = ({ value, onChange, className }: IOrderSort) => {
  return (
    <div className={className}>
      <Select
        options={sortOptions}
        value={[value]}
        onChange={(v) => onChange(v[0] as OrderSortValue)}
        placeholder="Sort orders"
        icon={<IcoSort className="h-5 w-5" />}
        className="w-full"
        multiple={false}
      />
    </div>
  )
}

export default OrderSort
