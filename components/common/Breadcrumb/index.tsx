import { BreadcrumbItem } from '@/types/collection/menuCollection'
import Link from 'next/link'
import React from 'react'

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
  const defaultSeparator = '/'
  const separatorElement = separator || defaultSeparator

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm capitalize md:text-base ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {showHome && (
          <>
            <li className="flex items-center">
              <Link
                href={homeHref}
                className="text-gray-500 transition-colors hover:text-gray-900 hover:underline"
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
                    className="text-gray-500 transition-colors hover:text-gray-900 hover:underline"
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`${
                      isCurrent ? 'font-medium text-gray-900' : 'text-gray-600'
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
