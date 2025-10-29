'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import DropdownContent from './DropdownContainer'
import { MenuItem } from '@/types/collection/menuCollection'

type Props = {
  menuItems: MenuItem[]
}

const SubHeader = ({ menuItems }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLElement>(null)

  console.log('menuItems :>> ', menuItems)
  // Xử lý delay khi hover
  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveIndex(index)
    setIsDropdownVisible(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownVisible(false)
      setTimeout(() => setActiveIndex(null), 300)
    }, 100)
  }

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  // Cleanup timeout khi unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="relative bg-gray-200 mt-15"
      onMouseLeave={handleMouseLeave}
    >
      <ul className="hidden md:flex items-center justify-center">
        {menuItems.map((col, index) => (
          <li
            key={col.url}
            className="py-4 px-3 relative"
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <Link
              href={`${col.url}`}
              className={`text-gray-800 font-medium transition-colors duration-200 ${
                activeIndex === index ? 'text-gray-900' : 'hover:text-gray-900'
              }`}
            >
              {col.title}
            </Link>

            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 transition-all duration-300 ${
                activeIndex === index
                  ? 'opacity-100 scale-x-100'
                  : 'opacity-0 scale-x-0'
              }`}
            />
          </li>
        ))}
      </ul>

      <div
        className={`absolute left-0 right-0 bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-10 ${
          isDropdownVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          transitionProperty: 'max-height, opacity',
          willChange: isDropdownVisible ? 'max-height, opacity' : 'auto',
        }}
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto px-4 py-8">
          {activeIndex !== null && (
            <DropdownContent
              menuItem={menuItems[activeIndex]}
              isVisible={isDropdownVisible}
            />
          )}
        </div>
      </div>
    </nav>
  )
}

export default SubHeader
