'use client'

import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Demo Next.js Image sizes</h2>
      <Image
        src="/hero_banner_fall.webp"
        alt="Banner"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 100vw"
      />
    </div>
  )
}

export default Page
