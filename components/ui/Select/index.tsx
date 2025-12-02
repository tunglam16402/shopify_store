'use client'

import React, { useState, useRef, useEffect } from 'react'

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
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  icon,
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
    <div ref={selectRef} className="relative w-full rounded-2xl">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full border rounded-lg px-4 py-2 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <span>{selectedLabel || placeholder || 'Select...'}</span>
        </div>
        <span>▼</span>
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
