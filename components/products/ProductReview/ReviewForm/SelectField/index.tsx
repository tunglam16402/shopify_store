'use client'

import { Label } from '@/components/ui/Label'
import React from 'react'

interface OptionSelectorProps {
  label: string
  name: string
  value: number
  options?: string[] 
  disabled?: boolean
  onChange: (value: number) => void
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({
  label,
  name,
  value,
  options = ['1', '2', '3', '4', '5'],
  disabled = false,
  onChange,
}) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <div className="flex flex-wrap gap-3 mt-4">
        {options.map((opt, idx) => {
          const val = idx + 1
          const selected = val === value
          return (
            <button
              key={val}
              type="button"
              disabled={disabled}
              onClick={() => onChange(val)}
              className={`py-2 px-3 font-semibold text-sm md:text-base flex items-center justify-center rounded-md border 
                ${selected ? 'bg-primary text-white border-primary opacity-100!' : 'bg-white border-gray-700 '}
                hover:opacity-70`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      <input type="hidden" name={name} value={value} />
    </div>
  )
}
