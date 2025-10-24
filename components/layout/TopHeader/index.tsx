'use client'
import React, { useEffect, useRef, useState } from 'react'

const messages = [
  '🚀 Free shipping for orders over 500K!',
  '🔥 Get 20% off when you sign up as a new member!',
  '🎁 Special gifts for orders over 1 million!',
  '💳 Absolutely safe and secure payment!',
]

const SCROLL_INTERVAL = 5000
const ANIMATION_DURATION = 500

const TopHeader: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [offsetPx, setOffsetPx] = useState(0)
  const [itemHeight, setItemHeight] = useState(40)
  const [useTransition, setUseTransition] = useState(true)

  const itemRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    const measure = () => {
      if (itemRef.current) {
        const h = Math.round(itemRef.current.getBoundingClientRect().height)
        if (h > 0) setItemHeight(h)
      }
    }
    measure()

    if (itemRef.current && 'ResizeObserver' in window) {
      resizeObserverRef.current = new ResizeObserver(measure)
      resizeObserverRef.current.observe(itemRef.current)
    }
    const t = window.setTimeout(measure, 100)
    return () => {
      clearTimeout(t)
      if (resizeObserverRef.current && itemRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserverRef.current.unobserve(itemRef.current)
      }
    }
  }, [])

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setUseTransition(true)
      setOffsetPx(-itemHeight)

      timeoutRef.current = window.setTimeout(() => {
        setUseTransition(false)
        setOffsetPx(0)
        setCurrentIndex((prev) => (prev + 1) % messages.length)

        requestAnimationFrame(() => {
          requestAnimationFrame(() => setUseTransition(true))
        })
      }, ANIMATION_DURATION)
    }, SCROLL_INTERVAL)

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [itemHeight])

  const nextIndex = (currentIndex + 1) % messages.length

  return (
    <div className="w-full bg-sub-primary text-white uppercase overflow-hidden">
      <div className="relative" style={{ height: itemHeight }}>
        <div
          style={{
            transform: `translateY(${offsetPx}px)`,
            transition: useTransition
              ? `transform ${ANIMATION_DURATION}ms ease`
              : 'none',
          }}
          className="absolute left-0 top-0 w-full"
        >
          <div
            ref={itemRef}
            className="flex items-center justify-center"
            style={{ height: itemHeight }}
          >
            <span className="text-sm">{messages[currentIndex]}</span>
          </div>

          <div
            className="flex items-center justify-center"
            style={{ height: itemHeight }}
          >
            <span className="text-sm">{messages[nextIndex]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
