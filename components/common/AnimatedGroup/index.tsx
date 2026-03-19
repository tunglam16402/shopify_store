'use client'

import React, { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { AnimationVariant } from '../AnimatedSection'
import { useInView } from '@/lib/hooks/useInView'

type VariantStyle = {
  opacity: [number, number]
  transform: [string, string]
}

const variantMap: Record<AnimationVariant, VariantStyle> = {
  'fade-up': {
    opacity: [0, 1],
    transform: ['translateY(48px)', 'translateY(0px)'],
  },
  'fade-down': {
    opacity: [0, 1],
    transform: ['translateY(-48px)', 'translateY(0px)'],
  },
  'fade-left': {
    opacity: [0, 1],
    transform: ['translateX(48px)', 'translateX(0px)'],
  },
  'fade-right': {
    opacity: [0, 1],
    transform: ['translateX(-48px)', 'translateX(0px)'],
  },
  fade: { opacity: [0, 1], transform: ['none', 'none'] },
  'scale-up': { opacity: [0, 1], transform: ['scale(0.92)', 'scale(1)'] },
  'slide-up': {
    opacity: [1, 1],
    transform: ['translateY(64px)', 'translateY(0px)'],
  },
}

interface AnimatedGroupProps {
  children: React.ReactNode
  className?: string
  itemClassName?: string
  variant?: AnimationVariant
  staggerDelay?: number
  initialDelay?: number
  duration?: number
  threshold?: number
}

export function AnimatedGroup({
  children,
  className,
  itemClassName,
  variant = 'fade-up',
  staggerDelay = 100,
  initialDelay = 0,
  duration = 700,
  threshold = 0.1,
}: AnimatedGroupProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin: '0px 0px -40px 0px',
  })
  const v = variantMap[variant]

  const transitionBase = useMemo(
    () =>
      `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    [duration]
  )

  const items = React.Children.toArray(children)

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className={cn(!inView && 'will-change-transform', itemClassName)}
          style={{
            opacity: inView ? v.opacity[1] : v.opacity[0],
            transform: inView ? v.transform[1] : v.transform[0],
            transition: transitionBase,
            transitionDelay: `${initialDelay + i * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
