'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface IPolicyDetail {
  policy: {
    title: string
    body: string
    url: string
  }
}

const POLICY_TABS = [
  { key: 'privacy-policy', label: 'Privacy Policy' },
  { key: 'refund-policy', label: 'Refund Policy' },
  { key: 'shipping-policy', label: 'Shipping Policy' },
  { key: 'terms-and-conditions', label: 'Terms & Conditions' },
]

const PolicyDetail = ({ policy }: IPolicyDetail) => {
  const pathname = usePathname()
  return (
    <div className="mt-6 grid grid-cols-12 gap-8 md:mt-10">
      <aside className="col-span-12 md:col-span-4">
        <nav className="sticky top-24 flex flex-col rounded-md border bg-white p-2 shadow-sm">
          {POLICY_TABS.map((tab) => {
            const isActive = pathname.endsWith(tab.key)
            return (
              <Link
                key={tab.key}
                href={`/pages/${tab.key}`}
                className={cn(
                  'w-full rounded-md px-4 py-3 text-left text-base font-medium uppercase transition md:text-lg',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <section className="col-span-12 md:col-span-8">
        <h1 className="mb-6 text-4xl uppercase font-semibold">{policy.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: policy.body }} />
      </section>
    </div>
  )
}

export default PolicyDetail
