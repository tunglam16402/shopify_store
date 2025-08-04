'use client'

import Link from 'next/link'
import { IoMdClose } from 'react-icons/io'

interface NavbarMobileProps {
  isOpen: boolean
  onClose: () => void
  menuItems: { title: string; url: string }[]
}

const NavbarMobile = ({ isOpen, onClose, menuItems }: NavbarMobileProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed md:hidden inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed md:hidden top-0 left-0 z-50 h-screen w-4/5 sm:w-1/3 bg-white p-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative h-full">
          <button
            onClick={onClose}
            className="absolute right-[-8px] side-text hover:text-primary"
            aria-label="Close menu"
          >
            <IoMdClose className="w-6 h-6" />
          </button>

          <div className="flex flex-col gap-6 text-lg">
            {menuItems.map((menu, key) => (
              <Link
                key={key}
                href={menu.url}
                onClick={onClose}
                className="text-primary text-hover"
              >
                {menu.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarMobile
