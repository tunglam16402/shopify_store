'use client'

import CartIcon from '@/components/cart/CartIcon'
import CartSideBar from '@/components/cart/CartSidebar'
import { Logo } from '@/components/icons'
import { AccountDropdown, NavbarMobile } from '@/components/menu'
import { useUI } from '@/lib/hooks/useContext'
import cn from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import SearchInput from './Search/SearchInput'

type Props = {
  menuItems: { title: string; url: string }[]
}

const MainHeader = ({ menuItems }: Props) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { open, isOpen } = useUI('cart')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isMobile = window.innerWidth < 768

      setScrolled(currentScrollY > 0)

      if (isMobile) {
        // Trên mobile: chỉ hiện header khi scroll lên
        if (currentScrollY < lastScrollY || currentScrollY < 500) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      } else {
        // Trên desktop: luôn hiện header (fixed)
        setVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={cn(
        'fixed left-0 w-full z-50 transition-all duration-300 ease-out bg-white py-2!',
        scrolled ? 'top-0' : 'top-10',
        !visible && 'md:translate-y-0 -translate-y-full'
      )}
    >
      <div className="main-width">
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
          <div className="shrink-0">
            <Link href="/">
              {/* <span className="w-10"> */}
                <Logo />
              {/* </span> */}
            </Link>
          </div>

          {/* Search desktop */}
          <div className="hidden md:block">
            <SearchInput />
          </div>

          <div className="flex items-center">
            <CartIcon onClick={open} />
            <AccountDropdown />
          </div>
        </div>

        <div className="mt-2 block md:hidden w-full">
          <SearchInput />
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
