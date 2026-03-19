'use client'

import { ElementType, useMemo } from 'react'
import { useInView } from '@/lib/hooks/useInView'
import { cn } from '@/lib/utils'

export type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade'
  | 'scale-up'
  | 'slide-up'

export interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
  as?: ElementType
}

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

export function AnimatedSection({
  children,
  className,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({ threshold, rootMargin })
  const v = variantMap[variant]

  const transition = useMemo(
    () =>
      `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    [duration]
  )

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn(!inView && 'will-change-transform', className)}
      style={{
        opacity: inView ? v.opacity[1] : v.opacity[0],
        transform: inView ? v.transform[1] : v.transform[0],
        transition,
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </Tag>
  )
}
