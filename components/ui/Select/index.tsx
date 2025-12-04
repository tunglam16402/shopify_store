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
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  icon?: React.ReactNode
  className?: string
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  icon,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => setIsOpen((prev) => !prev)

  const handleSelect = (val: string) => {
    onChange?.(val)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel = options.find((o) => o.value === value)?.label

  return (
    <div ref={selectRef} className="relative rounded-2xl">
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'border border-gray-400 rounded-lg px-4 py-2 gap-4 md:gap-8 flex items-center justify-between',
          className
        )}
      >
        <div className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <span>{selectedLabel || placeholder || 'Select...'}</span>
        </div>
        <IcoDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
