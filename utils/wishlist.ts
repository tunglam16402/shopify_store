import Cookies from 'js-cookie'

const COOKIE_KEY = 'wishlist'

export const getWishlistFromCookie = (): string[] => {
  const data = Cookies.get(COOKIE_KEY)
  return data ? JSON.parse(data || '[]') : []
}

export const setWishlistToCookie = (ids: string[]) => {
  Cookies.set(COOKIE_KEY, JSON.stringify(ids), { expires: 30 }) // expires 30 days
}

export const removeWishlistCookie = () => {
  Cookies.remove(COOKIE_KEY)
}
