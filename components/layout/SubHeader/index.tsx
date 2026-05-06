'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import DropdownContent from './DropdownContainer'
import { MenuItem } from '@/types/collection/menuCollection'
import { usePathname } from 'next/navigation'

type Props = {
  menuItems: MenuItem[]
}

const SubHeader = ({ menuItems }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const pathname = usePathname()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const itemsWithDropdown = useMemo(
    () => menuItems.map((item) => Boolean(item.children?.length)),
    [menuItems]
  )

  const clearPendingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const handleMouseEnter = useCallback(
    (index: number) => {
      clearPendingTimeout()
      setActiveIndex(index)
      setIsDropdownVisible(itemsWithDropdown[index])
    },
    [clearPendingTimeout, itemsWithDropdown]
  )

  const handleMouseLeave = useCallback(() => {
    clearPendingTimeout()
    timeoutRef.current = setTimeout(() => {
      setIsDropdownVisible(false)
      timeoutRef.current = setTimeout(() => {
        setActiveIndex(null)
      }, 300)
    }, 200)
  }, [clearPendingTimeout])

  const handleDropdownEnter = useCallback(() => {
    clearPendingTimeout()
  }, [clearPendingTimeout])

  useEffect(() => {
    return () => clearPendingTimeout()
  }, [clearPendingTimeout])

  const activeMenuItem = useMemo(
    () => (activeIndex !== null ? menuItems[activeIndex] : null),
    [activeIndex, menuItems]
  )

  useEffect(() => {
    setIsDropdownVisible(false)
    setActiveIndex(null)
  }, [pathname])

  return (
    <nav className="relative mt-15" onMouseLeave={handleMouseLeave}>
      <ul className="hidden items-center justify-center md:flex">
        {menuItems.map((item, index) => {
          const isActive = activeIndex === index

          return (
            <Link
              href={item.url}
              key={item.url}
              className="relative cursor-pointer px-3 py-4 text-xs lg:text-sm"
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <li
                className={`tex text-gray-800 uppercase transition-colors duration-200 ${
                  isActive ? 'text-sub-primary' : 'hover:text-sub-primary'
                }`}
              >
                {item.title}

                <span
                  className={`bg-sub-primary absolute right-0 bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                  aria-hidden="true"
                />
              </li>
            </Link>
          )
        })}
      </ul>
      <div
        className={`absolute right-0 left-0 z-10 overflow-hidden bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isDropdownVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          transitionProperty: 'max-height, opacity',
          willChange: isDropdownVisible ? 'max-height, opacity' : 'auto',
        }}
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handleMouseLeave}
      >
        {activeMenuItem?.children?.length && (
          <div className="container mx-auto px-4 py-8">
            <DropdownContent
              menuItem={activeMenuItem}
              isVisible={isDropdownVisible}
            />
          </div>
        )}
      </div>
    </nav>
  )
}

export default SubHeader
