/* eslint-disable @typescript-eslint/no-explicit-any */
import { BreadcrumbItem } from '@/components/common/Breadcrumb'
import { attachCartToCustomer } from '@/shopify/cart/use-cart'
import {
  GetProductDetailQuery,
  GetProductsQuery,
} from '@/shopify/types/graphql'
import { Cart } from '@/types/cart'
import { Address } from '@/types/customer/address'
import { AppError } from '@/types/error'

type VariantFromQuery = NonNullable<
  GetProductDetailQuery['product']
>['variants']['edges'][number]['node']

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

  return {
    id: product.id,
    variantId: product.variants.edges[0].node.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    publishedAt: product.publishedAt,
    category: product.category?.name,
    images: product.images.nodes.map((img) => ({
      url: img.url,
      altText: img.altText ?? null,
    })),
    basePrice,
    compareAtPrice: compareAt,
    currency: variant?.price.currencyCode || 'USD',
    discountPercent,
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

  return {
    basePrice,
    compareAtPrice: compareAt,
    discountPercent,
    currency: variant.price.currencyCode,
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

export function mapCartResponse(cartResponse: any): Cart {
  return {
    id: cartResponse.id,
    createdAt: cartResponse.createdAt,
    updatedAt: cartResponse.updatedAt,
    checkoutUrl: cartResponse.checkoutUrl,
    lines: cartResponse.lines.edges.map((e: any) => e.node),
    cost: cartResponse.cost,
  }
}

export function parseShopifyErrors(data: any): AppError[] {
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

  if (data?.userErrors?.length) {
    errors.push(
      ...data.userErrors.map((err: any) => ({
        field: err.field || [],
        message: err.message,
      }))
    )
  }

  return errors
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
