'use client'

import CartIcon from '@/components/cart/CartIcon'
import CartSideBar from '@/components/cart/CartSidebar'
import { Navbar } from '@/components/menu'
import Search from '@/components/menu/Search'
import { useCartUI } from '@/lib/hooks/useCart'
import cn from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'

type Props = {
  menuItems: { title: string; url: string }[]
}

const MainHeader = ({ menuItems }: Props) => {
  const [isOpenMobile, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openCart, isOpen } = useCartUI()

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
        <CartIcon onClick={openCart} />

        <button onClick={() => setIsOpen(!isOpenMobile)} className="md:hidden">
          <FaBars
            className={cn(
              'h-8 w-8 transition-colors duration-300',
              scrolled ? 'text-primary' : 'sub-text'
            )}
          />
        </button>
      </div>
      <div>{isOpen && <CartSideBar />} </div>

      {/* {isOpen && (
        <NavbarMobile
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          menuItems={menuItems}
        />
      )} */}
    </div>
  )
}

export default MainHeader
