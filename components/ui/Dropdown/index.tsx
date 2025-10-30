'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { IcoMinus, IcoPlus } from '@/components/icons'

interface DropdownLink {
  title: string
  pathname?: string
}

interface MobileDropdownProps {
  title: string
  links: DropdownLink[]
  defaultOpen?: boolean
  className?: string
  openIcon?: React.ReactNode
  closeIcon?: React.ReactNode
}

const Dropdown = ({
  title,
  links,
  defaultOpen = false,
  className,
  openIcon = <IcoMinus className="w-5 h-5" />,
  closeIcon = <IcoPlus className="w-5 h-5" />,
}: MobileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  //   if (!links?.length) return null

  return (
    <div className={clsx('border-b border-[#e3c16f] pb-4', className)}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="font-semibold uppercase tracking-wide">{title}</p>
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
        <ul className="pt-4 space-y-3">
          {links.map((item, index) => (
            <li key={index}>
              <a href={item.pathname || '#'} className="text-sm block">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dropdown