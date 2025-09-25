'use client'

import CartIcon from '@/components/cart/CartIcon'
import CartSideBar from '@/components/cart/CartSidebar'
import { Navbar, AccountDropdown, NavbarMobile } from '@/components/menu'
import Search from '@/components/layout/MainHeader/Search'
import { useUI } from '@/lib/hooks/useContext'
import cn from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { Logo } from '@/components/icons'

type Props = {
  menuItems: { title: string; url: string }[]
}

const MainHeader = ({ menuItems }: Props) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { open, isOpen } = useUI('cart')

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
        ' fixed left-0 w-full z-50 transition-[top] duration-300 ease-out bg-white shadow-md !py-2',
        scrolled ? 'top-0' : 'top-10'
      )}
    >
      <div className=" main-width">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="md:hidden"
          >
            <FaBars
              className={cn(
                'h-6 w-6 transition-colors duration-300',
                scrolled ? 'text-primary' : 'sub-text'
              )}
            />
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="w-10">
                <Logo />
              </span>
            </Link>
          </div>

          {/* Search desktop */}
          <div className="hidden md:block ">
            <Search />
          </div>
          {/* Navbar desktop */}
          {/* <Navbar menuItems={menuItems} /> */}

          {/* Icons bên phải */}
          <div className="flex items-center">
            <CartIcon onClick={open} />
            <AccountDropdown />
          </div>
        </div>

        <div className="mt-2 block md:hidden w-full">
          <Search />
        </div>

        {/* Cart sidebar */}
        <div>{isOpen && <CartSideBar />}</div>
      </div>
      {/* Navbar mobile */}
      {isOpenMobile && (
        <NavbarMobile
          isOpen={isOpenMobile}
          onClose={() => setIsOpenMobile(false)}
          menuItems={menuItems}
        />
      )}
    </div>
  )
}

export default MainHeader
