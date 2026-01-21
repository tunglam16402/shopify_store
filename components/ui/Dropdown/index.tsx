'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { IcoMinus, IcoPlus } from '@/components/icons'
import Link from 'next/link'

interface DropdownLink {
  title: string
  pathname?: string
}

interface DropdownProps {
  title: string
  links?: DropdownLink[]
  children?: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
  defaultOpen?: boolean
  className?: string
  titleClassName?: string
  openIcon?: React.ReactNode
  closeIcon?: React.ReactNode
}

const Dropdown = ({
  title,
  links,
  children,
  isOpen,
  onToggle,
  defaultOpen = false,
  className = '',
  titleClassName = '',
  openIcon = <IcoMinus className="w-5 h-5" />,
  closeIcon = <IcoPlus className="w-5 h-5" />,
}: DropdownProps) => {
  const isControlled = isOpen !== undefined && onToggle
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [height, setHeight] = useState(0)

  const contentRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<ResizeObserver | null>(null)

  const open = isControlled ? isOpen : internalOpen

  const toggle = useCallback(() => {
    if (isControlled && onToggle) onToggle()
    else setInternalOpen((v) => !v)
  }, [isControlled, onToggle])

  const hasLinks = links && links.length > 0

  useEffect(() => {
    const el = contentRef.current
    if (!el || !open) return

    const measure = () => setHeight(el.scrollHeight)
    measure()

    observerRef.current = new ResizeObserver(measure)
    observerRef.current.observe(el)

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [open, children, links])

  return (
    <div className={`border-b border-[#e3c16f] pb-4 ${className}`}>
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={toggle}
      >
        <p className={`font-semibold tracking-wide ${titleClassName}`}>
          {title}
        </p>

        <span
          className="transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          {open ? openIcon : closeIcon}
        </span>
      </div>

      <div
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxHeight: open ? `${height}px` : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="pb-4">
          {hasLinks ? (
            <ul className="space-y-3 text-sm mt-3">
              {links!.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.pathname || '#'}
                    className="block hover:text-[#e3c16f] transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
