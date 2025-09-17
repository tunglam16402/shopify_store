import Cookies from 'js-cookie'

interface CookieOptions {
  expires?: number | Date
  path?: string
}

export const getCookie = (key: string): string | null => {
  return Cookies.get(key) || null
}

export const setCookie = (
  key: string,
  value: string,
  options?: CookieOptions
) => {
  Cookies.set(key, value, { expires: 7, ...options })
}

export const removeCookie = (key: string, options?: CookieOptions) => {
  Cookies.remove(key, { ...options })
}
