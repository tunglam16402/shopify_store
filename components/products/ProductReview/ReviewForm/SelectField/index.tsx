'use client'

import { Label } from '@/components/ui/Label'
import React from 'react'

interface OptionSelectorProps<T extends string | number> {
  label: string
  name: string
  value: T
  options: T[]          
  onChange: (val: T) => void
}

export function OptionSelector<T extends string | number>({
  label,
  name,
  value,
  options,
  onChange,
}: OptionSelectorProps<T>) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>

      <div className="flex flex-wrap gap-3 mt-4">
        {options.map((opt) => {
          const selected = opt === value
          return (
            <div
              key={opt}
              onClick={() => onChange(opt)}
              className={`py-2 px-3 cursor-pointer font-semibold text-sm md:text-base flex items-center justify-center rounded-md border 
                ${selected ? 'bg-primary text-white border-primary' : 'bg-white border-gray-700'}
                hover:opacity-70`}
            >
              {opt}
            </div>
          )
        })}
      </div>

      <input type="hidden" name={name} value={value} />
    </div>
  )
}

