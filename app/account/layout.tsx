import { Logo } from '@/components/icons'
import Image from 'next/image'
import React, { Suspense } from 'react'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="mobile-mt relative -mb-20 bg-slate-50 pb-20"
      style={{
        backgroundImage: "url('/account-bg.svg')",
        backgroundSize: '200%',
      }}
    >
      {/* <div className="absolute -top-[260px] hidden w-full justify-center overflow-hidden md:flex">
        <Image
          alt=""
          src="/world-mist-desktop.webp"
          loading="lazy"
          width={1200}
          height={460}
        />
      </div> */}
      <div className="flex flex-col items-center justify-center py-6 md:py-12">
        <Logo className="w-full" />
        <p className="mt-6 max-w-[500px] text-center text-slate-600">
          Step into a world where imagination meets strategy — explore, shop,
          and relive every joyful move through the games and albums you love.
        </p>
      </div>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  )
}
