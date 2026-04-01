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
      <div className="bg-white uppercase">
        {/* Header */}
        <div className="relative flex items-center justify-center border-b bg-gray-100 p-4">
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

          <h3 className="text-center text-lg font-semibold">
            {selectedMenu ? selectedMenu.title : 'Menu'}
          </h3>
        </div>

        {/* Container */}
        <div className="relative h-[calc(100dvh-64px)] w-full overflow-hidden">
          <div
            className={`absolute h-full w-full bg-white transition-transform duration-300 ${
              selectedMenu ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            <ul className="divide-y">
              {menuItems.map((menu, index) => (
                <li key={index} className="p-3">
                  {menu.children?.length ? (
                    <button
                      onClick={() => setSelectedMenu(menu)}
                      className="flex w-full items-center justify-between font-medium text-gray-800 uppercase"
                    >
                      <span>{menu.title}</span>
                      <IcoFront className="h-5 w-5" />
                    </button>
                  ) : (
                    <Link
                      href={menu.url}
                      onClick={onClose}
                      className="block font-medium text-gray-800 hover:text-gray-900"
                    >
                      {menu.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`absolute h-full w-full bg-white transition-transform duration-300 ${
              selectedMenu ? 'translate-x-0' : 'translate-x-full'
            } overflow-y-auto`}
          >
            {selectedMenu && (
              <div className="flex h-full flex-col justify-between p-4">
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
                      closeIcon={<IcoDown className="h-5 w-5" />}
                      className="mb-2"
                    />
                  ))}
                </div>

                {previewImage && (
                  <div className="mt-10">
                    <div className="relative h-[350px] w-full overflow-hidden">
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
