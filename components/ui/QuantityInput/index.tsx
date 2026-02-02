'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { IcoMinus, IcoPlus } from '@/components/icons'
import cn from 'classnames'

interface QuantityInputProps {
  value: number
  min?: number
  max?: number
  loading?: boolean
  onChange: (newValue: number, immediate?: boolean) => void
  debounce?: number
  className?: string
}

export const QuantityInput = ({
  value,
  min = 1,
  max = 99,
  loading = false,
  onChange,
  debounce = 800,
  className,
}: QuantityInputProps) => {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue, false)
      }
    }, debounce)
    return () => clearTimeout(handler)
  }, [inputValue, value, debounce, onChange])

  const handleDecrease = () => {
    const newValue = Math.max(inputValue - 1, min)
    setInputValue(newValue)
    onChange(newValue, true)
  }

  const handleIncrease = () => {
    const newValue = Math.min(inputValue + 1, max)
    setInputValue(newValue)
    onChange(newValue, true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10) || min
    setInputValue(Math.min(Math.max(val, min), max))
  }

  return (
    <div
      className={cn(
        'flex items-center md:gap-2 border border-gray-200',
        className
      )}
    >
      <Button
        variant="default"
        size="icon"
        disabled={loading || inputValue <= min}
        onClick={handleDecrease}
      >
        <IcoMinus className="size-3 md:size-4" color="black" />
      </Button>

      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        className="w-4 md:w-6 text-center text-sm md:text-base border-none focus:outline-none 
          [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none 
          [-moz-appearance:textfield]"
        min={min}
        max={max}
      />

      <Button
        variant="default"
        size="icon"
        disabled={loading || inputValue >= max}
        onClick={handleIncrease}
      >
        <IcoPlus className="size-3 md:size-4"  color="black" />
      </Button>
    </div>
  )
}
