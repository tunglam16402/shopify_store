import {
  GetProductDetailQuery,
  GetProductsQuery,
} from '@/types/shopify/graphql'

type VariantFromQuery = NonNullable<
  GetProductDetailQuery['product']
>['variants']['edges'][number]['node']

export function mappingDiscountPrice(
  product: GetProductsQuery['products']['nodes'][0]
) {
  const variant = product.variants.edges[0]?.node
  const image = product.images.edges[0]?.node

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
    title: product.title,
    handle: product.handle,
    description: product.description,
    imageUrl: image?.url,
    altText: image?.altText || null,
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
