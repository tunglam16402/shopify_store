'use client'

import CartIcon from '@/components/cart/CartIcon'
import CartSideBar from '@/components/cart/CartSidebar'
import { Logo } from '@/components/icons'
import { AccountDropdown, NavbarMobile } from '@/components/menu'
import WishlistIconHeader from '@/components/Wishlist/WishlistIconHeader'
import { useUI } from '@/lib/hooks/useContext'
import cn from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import SearchInput from './Search/SearchInput'
import Modal from '@/components/common/Modal'

type Props = {
  menuItems: { title: string; url: string }[]
}

const MainHeader = ({ menuItems }: Props) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { open, isOpen, close } = useUI('cart')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isMobile = window.innerWidth < 768

      setScrolled(currentScrollY > 0)

      if (isMobile) {
        if (currentScrollY < lastScrollY || currentScrollY < 500) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      } else {
        setVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={cn(
        'fixed left-0 z-49 w-full bg-white py-2! transition-all duration-300 ease-out',
        scrolled ? 'top-0' : 'top-10',
        !visible && '-translate-y-full md:translate-y-0'
      )}
    >
      <div className="layout-width">
        <div className="flex items-center justify-between">
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

          <div className="shrink-0">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="hidden md:block">
            <SearchInput />
          </div>

          <div className="flex items-center justify-center gap-0 md:gap-4">
            <WishlistIconHeader />
            <CartIcon onClick={open} />
            <AccountDropdown />
          </div>
        </div>

        <div className="mt-2 block w-full md:hidden">
          <SearchInput />
        </div>

        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={close}
            className="h-full w-[390px] md:w-[480px]"
            align="right"
          >
            <CartSideBar isClose={close} />
          </Modal>
        )}
      </div>

      {isOpenMobile && (
        <Modal
          isOpen={isOpenMobile}
          onClose={() => setIsOpenMobile(false)}
          className="h-full w-[390px]"
          align="left"
          hasClose={false}
        >
          <NavbarMobile
            isOpen={isOpenMobile}
            onClose={() => setIsOpenMobile(false)}
            menuItems={menuItems}
          />
        </Modal>
      )}
    </div>
  )
}

export default MainHeader
