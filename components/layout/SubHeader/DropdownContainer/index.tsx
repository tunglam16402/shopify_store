'use client'

import { MenuItem } from '@/types/collection/menuCollection'
import Image from 'next/image'
import Link from 'next/link'

interface DropdownContentProps {
  menuItem: MenuItem
  isVisible: boolean
}

const DropdownContent = ({ menuItem }: DropdownContentProps) => {
  const children = menuItem.children || []
  const isVisible = true

  const allImages =
    children
      .flatMap((child) => child.children || [])
      .flatMap((grand) => grand.image || []) || []

  const images = allImages.slice(0, 3)
  const emptySlots = 3 - images.length

  return (
    <div
      className={`transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2">
          <ul className="flex flex-wrap gap-20">
            {children.map((child, index) => (
              <li key={index}>
                <p className="text-sm font-medium uppercase">
                  <Link
                    href={child.url}
                    className="hover:text-gray-700 transition-colors"
                  >
                    {child.title}
                  </Link>
                </p>

                {child.children && child.children?.length > 0 && (
                  <ul className="flex flex-col gap-1 text-sm mt-4">
                    {child.children.map((grand, index) => (
                      <li key={index}>
                        <Link
                          href={grand.url}
                          className="hover:text-[#f89540] font-light uppercase transition-colors"
                        >
                          {grand.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-3 grid grid-cols-3 gap-4 place-items-center">
          {Array.from({ length: emptySlots }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="w-full aspect-square bg-transparent"
            />
          ))}
          {images.map((src, i) => (
            <div
              key={i}
              className="relative w-full aspect-square overflow-hidden"
            >
              <Link href={menuItem.url}>
                <Image
                  src={src}
                  alt={`${menuItem.title} preview ${i + 1}`}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DropdownContent
