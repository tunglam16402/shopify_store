'use client'

import { IcoDown } from '@/components/icons'
import React, { useState, useRef, useEffect } from 'react'
import cn from 'classnames'

interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  options: SelectOption[]
  value: string[]            // luôn là array
  onChange: (value: string[]) => void
  placeholder?: string
  icon?: React.ReactNode
  className?: string
}

const Select: React.FC<SelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = 'Select...',
  icon,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggle = () => setIsOpen((p) => !p)

  const handleSelect = (val: string) => {
    const next = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val]

    onChange(next)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative rounded-2xl">
      {/* BUTTON */}
      <button
        type="button"
        onClick={toggle}
        className={cn(
          'border border-gray-400 rounded-lg px-4 py-2 gap-4 md:gap-8 flex items-center justify-between',
          className
        )}
      >
        <div className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <span>{placeholder}</span>
        </div>
        <IcoDown className="w-4 h-4" />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-60 overflow-auto">
          {options.map((opt) => {
            const checked = value.includes(opt.value)

            return (
              <li
                key={opt.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                onClick={() => handleSelect(opt.value)}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="w-4 h-4"
                />
                <span>{opt.label}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Select
