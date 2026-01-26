'use client'

import { IcoHeart } from '@/components/icons'
import { useWishList } from '@/lib/hooks/useWishlist'

export default function WishlistButton({
  productId,
  iconClassName,
}: {
  productId: string
  iconClassName?: string
}) {
  const { wishlistSet, toggleWishlist } = useWishList()

  const liked = wishlistSet?.has(productId)
  const onClickHeartIcon = async () => {
    await toggleWishlist?.({
      productId,
      liked: !liked,
    })
  }

  return (
    <button className="text-2xl" onClick={onClickHeartIcon}>
      <IcoHeart
        className={`${iconClassName || 'h-8 w-8 z-11'} ${
          liked ? 'fill-[#e42340]! [&>path]:stroke-[#e42340]!' : 'fill-none'
        }`}
      />
    </button>
  )
}
