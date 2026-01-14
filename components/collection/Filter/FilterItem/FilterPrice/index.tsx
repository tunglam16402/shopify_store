'use client'

import React, { useMemo, useState } from 'react'
import { Facets } from '@/components/collection/type'

interface IFilter {
  facets: Facets[]
}

const FilterPrice = ({ facets }: IFilter) => {
  const priceFacet = useMemo(
    () => facets.find((f) => f.type === 'PRICE_RANGE'),
    [facets]
  )

  if (!priceFacet) return null

  const { min: minRange, max: maxRange } = JSON.parse(
    priceFacet.values[0].input
  ).price

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [min, setMin] = useState(minRange)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [max, setMax] = useState(maxRange)

  const handleMinChange = (value: number) => {
    if (value >= max) return
    setMin(value)
  }

  const handleMaxChange = (value: number) => {
    if (value <= min) return
    setMax(value)
  }

  return (
    <div className="space-y-4">
      {/* Inputs */}
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={min}
          min={minRange}
          max={max}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="w-24 rounded border px-2 py-1 text-sm"
        />
        <span className="text-gray-400">–</span>
        <input
          type="number"
          value={max}
          min={min}
          max={maxRange}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="w-24 rounded border px-2 py-1 text-sm"
        />
      </div>

      {/* Slider */}
      <div className="relative h-2">
        {/* Track */}
        <div className="absolute inset-0 rounded bg-gray-200" />

        {/* Active range */}
        <div
          className="absolute h-2 rounded bg-black"
          style={{
            left: `${((min - minRange) / (maxRange - minRange)) * 100}%`,
            right: `${100 - ((max - minRange) / (maxRange - minRange)) * 100}%`
          }}
        />

        {/* Min range */}
        <input
          type="range"
          min={minRange}
          max={maxRange}
          value={min}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="range-thumb pointer-events-auto absolute inset-0 w-full appearance-none bg-transparent"
        />

        {/* Max range */}
        <input
          type="range"
          min={minRange}
          max={maxRange}
          value={max}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="range-thumb pointer-events-auto absolute inset-0 w-full appearance-none bg-transparent"
        />
      </div>

      {/* Display */}
      <div className="text-sm text-gray-600">
        ${min} – ${max}
      </div>
    </div>
  )
}

export default FilterPrice
