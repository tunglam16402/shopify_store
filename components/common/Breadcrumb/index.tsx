import { IcoFront } from '@/components/icons'
import Link from 'next/link'
import React from 'react'

// Type định nghĩa cho breadcrumb item
export interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  showHome?: boolean
  homeHref?: string
  className?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  showHome = true,
  homeHref = '/',
  className = '',
}) => {
  const defaultSeparator = "/"
  const separatorElement = separator || defaultSeparator

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm md:text-base capitalize ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1 font-light">
        {showHome && (
          <>
            <li className="flex items-center">
              <Link
                href={homeHref}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Home"
              >
                Home
              </Link>
            </li>
            {items.length > 0 && (
              <li className="flex items-center" aria-hidden="true">
                {separatorElement}
              </li>
            )}
          </>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isCurrent = item.isCurrentPage || isLast

          return (
            <React.Fragment key={index}>
              <li className="flex items-center">
                {item.href && !isCurrent ? (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors hover:underline"
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`${
                      isCurrent ? 'text-gray-900 font-medium' : 'text-gray-600'
                    }`}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li className="flex items-center" aria-hidden="true">
                  {separatorElement}
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
