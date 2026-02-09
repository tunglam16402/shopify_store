import { IcoHeart } from '@/components/icons'
import { useWishList } from '@/lib/hooks/useWishlist'
import Link from 'next/link'

const WishlistIconHeader = () => {
  const { wishlistSet } = useWishList()
  return (
    <>
      <Link
        href="/wishlist"
        aria-label="open wishlist page"
        className="hover:[&_path]:stroke-primary relative p-2"
      >
        <IcoHeart className="size-5 md:size-6" />

        <span className="bg-primary absolute top-0 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-xs text-white">
          {wishlistSet?.size || 0}
        </span>
      </Link>
    </>
  )
}

export default WishlistIconHeader
