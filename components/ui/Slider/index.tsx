'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface SliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  tickCount?: number
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  tickCount,
  ...props
}: SliderProps) {
  const values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  const ticks = React.useMemo(() => {
    if (!tickCount || tickCount < 2) return []

    const step = (max - min) / (tickCount - 1)

    return Array.from({ length: tickCount }, (_, i) => {
      const v = min + step * i
      return {
        value: Math.round(v),
        percent: ((v - min) / (max - min)) * 100,
      }
    })
  }, [tickCount, min, max])

  const showTicks = ticks.length > 0

  return (
    <div className="relative w-full">
      <SliderPrimitive.Root
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        className={cn(
          'relative flex w-full touch-none items-center select-none',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-muted">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />

          {/* Tick */}
          {showTicks && (
            <div className="pointer-events-none absolute inset-0">
              {ticks.map((tick, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${tick.percent}%` }}
                >
                  <div
                    className={cn(
                      'mx-auto bg-muted-foreground h-3 ',
                      i === 0 || i === ticks.length - 1 ? 'w-0.5' : 'w-px'
                    )}
                  />
                </div>
              ))}
            </div>
          )}
        </SliderPrimitive.Track>

        {values.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block w-3 md:w-2.5 md:h-4 rounded h-5 border border-black shadow-2xl bg-white focus-visible:ring-4 focus-visible:ring-ring"
          />
        ))}
      </SliderPrimitive.Root>

      {/* Tick labels */}
      {showTicks && (
        <div className="relative mt-3 h-4 w-full ">
          {ticks.map((tick, i) => (
            <span
              key={i}
              className={cn(
                'absolute text-sm text-muted-foreground',
                i === 0 && 'translate-x-0 text-left',
                i === ticks.length - 1 && '-translate-x-full text-right',
                i !== 0 &&
                  i !== ticks.length - 1 &&
                  '-translate-x-1/2 text-center'
              )}
              style={{ left: `${tick.percent}%` }}
            >
              {tick.value}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export { Slider }
