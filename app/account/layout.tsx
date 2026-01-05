import { Logo } from '@/components/icons'
import React, { Suspense } from 'react'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-slate-50">
      <div className="flex flex-col items-center justify-center py-16">
        <Logo className="w-full" />
        <p className="text-slate-600 mt-6 max-w-[500px] text-center">
          Step into a world where imagination meets strategy — explore, shop,
          and relive every joyful move through the games and albums you love.
        </p>
      </div>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  )
}
