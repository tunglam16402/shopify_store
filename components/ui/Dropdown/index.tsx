'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { IcoMinus, IcoPlus } from '@/components/icons'

interface DropdownLink {
  title: string
  pathname?: string
}

interface DropdownProps {
  title: string
  links?: DropdownLink[]
  children?: React.ReactNode
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
  defaultOpen = false,
  className,
  titleClassName,
  openIcon = <IcoMinus className="w-5 h-5" />,
  closeIcon = <IcoPlus className="w-5 h-5" />,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const hasLinks = links && links.length > 0

  return (
    <div className={clsx('border-b border-[#e3c16f] pb-4', className)}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className={clsx('font-semibold tracking-wide', titleClassName)}>
          {title}
        </p>
        <button
          type="button"
          className="text-white transition-transform duration-300"
        >
          {isOpen ? openIcon : closeIcon}
        </button>
      </div>

      <div
        className={clsx(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {hasLinks ? (
          <ul className="pt-4 space-y-3 text-sm">
            {links!.map((item, index) => (
              <li key={index}>
                <a href={item.pathname || '#'} className="block">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          children && (
            <div className="whitespace-pre-line leading-relaxed">
              {children}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Dropdown
