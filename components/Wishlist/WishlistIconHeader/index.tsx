import { IcoHeart } from '@/components/icons'
import { useWishList } from '@/lib/hooks/useWishlist'
import Link from 'next/link'
import React from 'react'

const WishlistIconHeader = () => {
  const { wishlistSet } = useWishList()
  return (
    <>
      <Link
        href="/wishlist"
        aria-label="open wishlist page"
        className="relative hover:[&_path]:stroke-primary p-2"
      >
        <IcoHeart className="w-6 h-6" />

        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {wishlistSet?.size || 0}
        </span>
      </Link>
    </>
  )
}

export default WishlistIconHeader
