'use client'

import { IcoBack, IcoClose, IcoDown, IcoFront, IcoUp } from '@/components/icons'
import Dropdown from '@/components/ui/Dropdown'
import { MenuItem } from '@/types/collection/menuCollection'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
}

const NavbarMobile = ({ isOpen, onClose, menuItems }: Props) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const getPreviewImage = (menu: MenuItem) => {
    for (const child of menu.children || []) {
      for (const grand of child.children || []) {
        const image = Array.isArray(grand.image) ? grand.image[0] : grand.image
        if (image) return image
      }
    }
    return null
  }

  const previewImage = selectedMenu ? getPreviewImage(selectedMenu) : null

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 backdrop-blur-[1px] transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-0 w-[350px] bg-white z-40 transform transition-transform duration-300 ease-in-out uppercase ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-center p-4 border-b bg-gray-100">
          {selectedMenu ? (
            <button
              onClick={() => setSelectedMenu(null)}
              className="absolute left-4 text-2xl"
            >
              <IcoBack className="h-5 w-5" />
            </button>
          ) : (
            <button onClick={onClose} className="absolute right-4 text-2xl">
              <IcoClose className="h-5 w-5" />
            </button>
          )}

          <h3 className="font-semibold text-lg text-center">
            {selectedMenu ? selectedMenu.title : 'Menu'}
          </h3>
        </div>

        {/* Container */}
        <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
          <div
            className={`absolute w-full h-full bg-white transition-transform duration-300 ${
              selectedMenu ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            <ul className="divide-y">
              {menuItems.map((menu, index) => (
                <li key={index} className="p-3">
                  {menu.children?.length ? (
                    <button
                      onClick={() => setSelectedMenu(menu)}
                      className="w-full flex justify-between items-center text-gray-800 font-medium uppercase"
                    >
                      <span>{menu.title}</span>
                      <IcoFront className="h-5 w-5" />
                    </button>
                  ) : (
                    <Link
                      href={menu.url}
                      onClick={onClose}
                      className="block text-gray-800 font-medium hover:text-gray-900"
                    >
                      {menu.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`absolute w-full h-full bg-white transition-transform duration-300 ${
              selectedMenu ? 'translate-x-0' : 'translate-x-full'
            } overflow-y-auto`}
          >
            {selectedMenu && (
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  {selectedMenu.children?.map((child, index) => (
                    <Dropdown
                      key={index}
                      title={child.title}
                      links={
                        child.children?.map((grand) => ({
                          title: grand.title,
                          pathname: grand.url,
                        })) || []
                      }
                      openIcon={<IcoDown className="h-5 w-5" />}
                      closeIcon={<IcoDown className="h-5 w-5 " />}
                      className="mb-4"
                    />
                  ))}
                </div>

                {previewImage && (
                  <div className="mt-10">
                    <div className="relative w-full h-[350px] overflow-hidden">
                      <Image
                        src={previewImage}
                        alt={selectedMenu.title}
                        fill
                        className="object-contain"
                        sizes="100vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarMobile
