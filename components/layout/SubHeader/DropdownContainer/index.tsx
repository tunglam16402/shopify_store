'use client'

import { MenuItem } from '@/types/collection/menuCollection'
import Image from 'next/image'
import Link from 'next/link'

interface DropdownContentProps {
  menuItem: MenuItem
  isVisible: boolean
}

const DropdownContent = ({ menuItem, isVisible }: DropdownContentProps) => {
  const children = menuItem.children || []

  return (
    <div
      className={`transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột 1 + 2: nhóm danh mục con */}
        <div className="md:col-span-2">
          {children.length > 0 ? (
            <ul className="space-y-4">
              {children.map((child, index) => (
                <li key={index}>
                  {/* Tiêu đề cấp 2 */}
                  <p className="font-medium text-gray-900 mb-1">
                    <Link
                      href={child.url}
                      className="hover:text-gray-700 transition-colors"
                    >
                      {child.title}
                    </Link>
                  </p>

                  {/* Danh mục cấp 3 */}
                  {child.children && child.children.length > 0 && (
                    <ul className="flex flex-col gap-2 text-sm text-gray-700">
                      {child.children.map((grand, index) => (
                        <li key={index}>
                          <Link
                            href={grand.url}
                            className="hover:text-gray-900 transition-colors"
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
          ) : (
            <p className="text-sm text-gray-500 italic">Chưa có danh mục con</p>
          )}
        </div>

        {/* Cột 3: ảnh preview của các collection cấp 3 */}
        {children.some((child) =>
          child.children?.some((g) => g.image?.length)
        ) && (
          <div className="grid grid-cols-3 gap-2">
            {children
              .flatMap((child) => child.children || [])
              .flatMap((grand) => grand.image || [])
              .slice(0, 3)
              .map((src, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={src}
                    alt={`${menuItem.title} preview ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownContent
