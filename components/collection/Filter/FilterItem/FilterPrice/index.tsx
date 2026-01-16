'use client'

import { Facets } from '@/components/collection/type'
import { Slider } from '@/components/ui/Slider'
import { useFilterProduct } from '@/lib/hooks/useFilterProduct'
import { useSearchParams } from 'next/navigation'
import { memo, useEffect, useMemo, useState } from 'react'

interface IFilter {
  globalPrice: Facets[]
}

const FilterPrice = ({ globalPrice }: IFilter) => {
  const searchParams = useSearchParams()
  const { setRange } = useFilterProduct()

  const { min: globalMin, max: globalMax } = useMemo(() => {
    const facet = globalPrice.find((f) => f.type === 'PRICE_RANGE')
    if (!facet?.values?.[0]?.input) return { min: 0, max: 0 }

    try {
      const { price } = JSON.parse(facet.values[0].input)
      return {
        min: price?.min ?? 0,
        max: price?.max ?? 0,
      }
    } catch {
      return { min: 0, max: 0 }
    }
  }, [globalPrice])

  const min = Number(searchParams.get('price_min')) || globalMin
  const max = Number(searchParams.get('price_max')) || globalMax

  const [range, setLocalRange] = useState<[number, number]>([min, max])

  useEffect(() => {
    setLocalRange([min, max])
  }, [min, max])

  const commit = ([min, max]: [number, number]) => {
    setRange(
      { min: 'price_min', max: 'price_max' },
      { min, max },
      { min: globalMin, max: globalMax }
    )
  }

  return (
    <div className="space-y-4 mt-4 border-b pb-6">
      <span className="md:text-lg font-semibold text-lg">Price</span>
      <div className="flex items-center gap-3 mt-4">
        <input
          type="number"
          min={globalMin}
          max={range[1]}
          value={range[0]}
          onChange={(e) =>
            setLocalRange(([_, max]) => [
              Math.min(Number(e.target.value), max),
              max,
            ])
          }
          onBlur={() => commit(range)}
          className="w-full rounded border px-2 py-1 md:text-base text-lg"
        />

        <span className="text-lg">-</span>

        <input
          type="number"
          min={range[0]}
          max={globalMax}
          value={range[1]}
          onChange={(e) =>
            setLocalRange(([min]) => [
              min,
              Math.max(Number(e.target.value), min),
            ])
          }
          onBlur={() => commit(range)}
          className="w-full rounded border px-2 py-1 text-lg md:text-base"
        />
      </div>

      <Slider
        min={globalMin}
        max={globalMax}
        step={1}
        value={range}
        onValueChange={(v) => setLocalRange(v as [number, number])}
        onValueCommit={(v) => commit(v as [number, number])}
        className="mt-10"
      />
    </div>
  )
}

export default memo(FilterPrice)
