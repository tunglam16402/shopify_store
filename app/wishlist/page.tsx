import Breadcrumb from '@/components/common/Breadcrumb'
import Wishlist from '@/components/Wishlist'
import React from 'react'

const WistlistPage = async () => {
  return (
    <div className="mt-[132px] md:mt-4">
      <div className="layout-width">
        <Breadcrumb items={[{ label: 'Wishlist', href: '/wishlist' }]} />
        <div className="mt-4 md:mt-6">
          <h1 className="text-3xl md:text-5xl uppercase font-light">
            Wishlist
          </h1>
        </div>
      </div>

      <Wishlist />
    </div>
  )
}

export default WistlistPage
