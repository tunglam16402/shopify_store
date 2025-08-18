'use client'

import Search from '@/components/menu/Search'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import cn from 'classnames'
import { Navbar, NavbarMobile } from '@/components/menu'

type Props = {
  menuItems: { title: string; url: string }[]
}

const MainHeader = ({ menuItems }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div
      className={cn(
        'wrapper fixed top-0 left-0 w-full z-50 transition-all duration-500',
        scrolled ? 'bg-white shadow-md !py-2' : 'bg-transparent'
      )}
    >
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <span
              className={cn(
                'text-2xl font-bold uppercase leading-tight block transition-all duration-300',
                scrolled ? 'text-primary' : 'sub-text'
              )}
            >
              Travel
              <br />
              Next level
            </span>
          </Link>
        </div>
        <Navbar menuItems={menuItems} />
        <Search />
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <FaBars
            className={cn(
              'h-8 w-8 transition-colors duration-300',
              scrolled ? 'text-primary' : 'sub-text'
            )}
          />
        </button>
      </div>

      {isOpen && (
        <NavbarMobile
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          menuItems={menuItems}
        />
      )}
    </div>
  )
}

export default MainHeader
