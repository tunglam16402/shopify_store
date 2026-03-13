/* eslint-disable @typescript-eslint/no-explicit-any */
import { attachCartToCustomer } from '@/shopify/cart/use-cart'
import {
  GetCustomerQuery,
  GetProductDetailQuery,
  GetProductsQuery,
} from '@/shopify/types/graphql'
import { BreadcrumbItem } from '@/types/collection/menuCollection'
import { Customer } from '@/types/customer'
import { Address } from '@/types/customer/address'
import { AppError } from '@/types/error'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

type VariantFromQuery = NonNullable<
  GetProductDetailQuery['product']
>['variants']['edges'][number]['node']

export const CURRENCY_SYMBOL_MAP: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  VND: '₫',
}

export function normalizeTitle(text: string) {
  return text.toLowerCase().replace(/\b\p{L}/gu, (c) => c.toUpperCase())
}

export function mappingDiscountPrice(
  product: GetProductsQuery['products']['nodes'][0]
) {
  const variant = product.variants.edges[0]?.node
  const basePrice = parseFloat(variant?.price.amount || '0')
  const compareAt = variant?.compareAtPrice?.amount
    ? parseFloat(variant.compareAtPrice.amount)
    : basePrice

  const discountPercent =
    compareAt > basePrice
      ? Math.round(((compareAt - basePrice) / compareAt) * 100)
      : 0

  const currencyCode = variant?.price.currencyCode || 'USD'

  return {
    id: product.id,
    variantId: product.variants.edges[0].node.id,
    title: normalizeTitle(product.title),
    handle: product.handle,
    tags: product.tags,
    description: product.description,
    publishedAt: product.publishedAt,
    category: product.category?.name,
    images: product.images.nodes.map((img) => ({
      url: img.url,
      altText: img.altText ?? null,
    })),
    basePrice,
    compareAtPrice: compareAt,
    currency: CURRENCY_SYMBOL_MAP[currencyCode] ?? currencyCode,
    discountPercent,
    
  }
}

export function mapCustomer(
  customer: NonNullable<GetCustomerQuery['customer']>
): Customer {
  return {
    id: customer.id,
    email: customer.email ?? '',
    firstName: customer.firstName ?? '',
    lastName: customer.lastName ?? '',
    phone: customer.phone ?? undefined,
    createdAt: customer.createdAt,
    acceptsMarketing: customer.acceptsMarketing,

    defaultAddress: customer.defaultAddress,
    orders: customer.orders,
    addresses: customer.addresses,

    gender:
      customer.gender?.value === 'male' ||
      customer.gender?.value === 'female' ||
      customer.gender?.value === 'other'
        ? customer.gender.value
        : null,

    dateOfBirth: customer.dateOfBirth?.value ?? null,
  }
}

export function mappingVariantPrice(variant: VariantFromQuery) {
  const basePrice = parseFloat(variant.price.amount)

  const compareAt = variant.compareAtPrice?.amount
    ? parseFloat(variant.compareAtPrice.amount)
    : basePrice

  const discountPercent =
    compareAt > basePrice
      ? Math.round(((compareAt - basePrice) / compareAt) * 100)
      : 0

  const currencyCode = variant.price.currencyCode

  return {
    basePrice,
    compareAtPrice: compareAt,
    discountPercent,
    currency: CURRENCY_SYMBOL_MAP[currencyCode] ?? currencyCode,
  }
}

export function transformShopifyUrl(url?: string | null): string {
  if (!url) return '/'

  try {
    const path = new URL(url).pathname
    if (path === '/collections/all') return '/products'

    return path
  } catch {
    return '/'
  }
}

export const useBreadcrumb = (
  pathname: string,
  customLabels?: Record<string, string>
) => {
  const segments = pathname.split('/').filter(Boolean)

  const items: BreadcrumbItem[] = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const label =
      customLabels?.[segment] ||
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    return { label, href }
  })

  return items
}

export function formatDate(
  dateString?: string,
  locale: string = 'en-EN',
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
): string {
  if (!dateString) return 'Invalid Date'

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Invalid Date'

  return date.toLocaleDateString(locale, options)
}

export function parseShopifyCustomersErrors(data: any): AppError[] {
  const errors: AppError[] = []

  if (data?.customerUserErrors?.length) {
    errors.push(
      ...data.customerUserErrors.map((err: any) => ({
        field: err.field || [],
        code: err.code || 'CUSTOMER_ERROR',
        message: err.message,
      }))
    )
  }

  return errors
}

export function parseShopifyUsersErrors(data: any): AppError[] {
  const errors: AppError[] = []

  if (data?.userErrors?.length) {
    errors.push(
      ...data.userErrors.map((err: any) => ({
        field: err.field || [],
        code: 'USER_ERROR',
        message: err.message,
      }))
    )
  }

  return errors
}

export function formatPhoneE164(
  rawPhone: string,
  country: 'VN' | 'US' = 'VN'
): string | null {
  const phone = parsePhoneNumberFromString(rawPhone, country)
  if (!phone || !phone.isValid()) return null
  return phone.format('E.164')
}

export function normalizeAddress(address: any): Address {
  return {
    address1: address.address1 ?? undefined,
    address2: address.address2 ?? undefined,
    city: address.city ?? undefined,
    company: address.company ?? undefined,
    country: address.country ?? undefined,
    firstName: address.firstName ?? undefined,
    lastName: address.lastName ?? undefined,
    phone: address.phone ?? undefined,
    province: address.province ?? undefined,
    zip: address.zip ?? undefined,
  }
}

export const mergeGuestCartToCustomer = async (
  cartId: string,
  customerAccessToken: string
) => {
  try {
    const updatedCart = await attachCartToCustomer(cartId, {
      customerAccessToken,
    })
    return updatedCart
  } catch (err) {
    console.error('Merge guest cart failed', err)
    return null
  }
}

export function toURLSearchParams(
  searchParams: Record<string, string | string[] | undefined>
) {
  const params = new URLSearchParams()

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v))
    } else if (value) {
      params.append(key, value)
    }
  })

  return params
}
