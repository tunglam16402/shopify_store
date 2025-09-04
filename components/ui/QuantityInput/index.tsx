'use client'
import { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface QuantityInputProps {
  value: number
  min?: number
  max?: number
  loading?: boolean
  onChange: (newValue: number, immediate?: boolean) => void
  debounce?: number
}

export const QuantityInput = ({
  value,
  min = 1,
  max = 99,
  loading = false,
  onChange,
  debounce = 800,
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
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={loading || inputValue <= min}
        onClick={handleDecrease}
      >
        <Minus className="w-4 h-4" />
      </Button>

      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        className="w-10 text-center border-none focus:outline-none bg-transparent 
          appearance-none 
          [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none 
          [-moz-appearance:textfield]"
        min={min}
        max={max}
      />

      <Button
        variant="outline"
        size="icon"
        disabled={loading || inputValue >= max}
        onClick={handleIncrease}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  )
}
