import { RootState } from '@/store/store'
import {
  getWishlistFromCookie,
  removeWishlistCookie,
  setWishlistToCookie,
} from '@/utils/wishlist'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

const fetchWishList = async (userId?: string) => {
  const localWishlist = getWishlistFromCookie()
  if (!userId) return localWishlist

  try {
    if (localWishlist.length) {
      const res = await fetch('/api/wishlist/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productIds: localWishlist,
        }),
      })

      const data = await res.json()

      if (data?.wishlist) {
        removeWishlistCookie()
        return data.wishlist
      }
    }

    const res = await fetch('/api/wishlist/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })

    const data = await res.json()
    return data?.productIds || []
  } catch {
    return []
  }
}

export function useWishList() {
  const { customer, loading: loadingCustomer } = useSelector(
    (state: RootState) => state.user
  )

  const {
    data: wishlistArray,
    isLoading,
    mutate,
  } = useSWR<string[]>(
    !loadingCustomer
      ? customer?.id
        ? ['wishlist', customer.id]
        : ['wishlist', 'guest']
      : null,
    () => fetchWishList(customer?.id),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60 * 60 * 1000,
    }
  )

  const toggleWishlist = async ({
    productId,
    liked,
  }: {
    productId: string
    liked: boolean
  }) => {
    try {
      const wishlistSet = new Set(wishlistArray || [])
      liked ? wishlistSet.add(productId) : wishlistSet.delete(productId)
      mutate([...wishlistSet], false)

      // Cookies Storage for non-logged in users
      if (!customer?.id) {
        setWishlistToCookie([...wishlistSet])
        return
      }

      const res = await fetch(`/api/wishlist/${liked ? 'add' : 'remove'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: customer.id,
          productId,
        }),
      })

      const data = await res.json()

      return !!data?.success
    } catch (error) {}
  }

  return {
    wishlistSet: new Set(wishlistArray || []),
    toggleWishlist,
    loading: isLoading || loadingCustomer,
    refreshWishlist: mutate,
  }
}
