import { ProductFilter } from './types/graphql'

export function parseSort(sort?: string) {
  switch (sort) {
    case 'best-selling':
      return { sortKey: 'BEST_SELLING', reverse: false }

    case 'price-asc':
      return { sortKey: 'PRICE', reverse: false }

    case 'price-desc':
      return { sortKey: 'PRICE', reverse: true }

    case 'date-new-old':
      return { sortKey: 'CREATED', reverse: true }

    case 'date-old-new':
      return { sortKey: 'CREATED', reverse: false }

    case 'title-asc':
      return { sortKey: 'TITLE', reverse: false }

    case 'title-desc':
      return { sortKey: 'TITLE', reverse: true }

    default:
      return { sortKey: 'COLLECTION_DEFAULT', reverse: false }
  }
}

export function buildProductFilters(
  searchParams: URLSearchParams
): ProductFilter[] {
  const filters: ProductFilter[] = []

  const priceMin =
    searchParams.get('price_min') !== null
      ? Number(searchParams.get('price_min'))
      : undefined
  const priceMax =
    searchParams.get('price_max') !== null
      ? Number(searchParams.get('price_max'))
      : undefined

  if (
    (priceMin !== undefined && !isNaN(priceMin)) ||
    (priceMax !== undefined && !isNaN(priceMax))
  ) {
    filters.push({
      price: {
        min: priceMin,
        max: priceMax,
      },
    })
  }

  for (const [key, value] of searchParams.entries()) {
    if (!value) continue

    switch (key) {
      case 'available':
        filters.push({ available: value === 'true' })
        break

      case 'productVendor':
        filters.push({ productVendor: value })
        break

      case 'tag':
        filters.push({ tag: value })
        break

      case 'ageGroup':
        filters.push({
          taxonomyMetafield: {
            namespace: 'shopify',
            key: 'recommended-age-group',
            value,
          },
        })
        break

      case 'price_min':
      case 'price_max':
        break

      default:
        break
    }
  }

  return filters
}

export const PRODUCT_HIDDEN_TAGS = ['_hidden', '_gift', 'custom_fee'] as const

function normalizeTags(tags?: string[] | string | null): string[] {
  if (!tags) return []
  if (Array.isArray(tags)) return tags
  return [tags]
}

export function isPublicShopifyProduct(product: {
  publishedAt?: string | null
  tags?: string[] | string | null
}) {
  if (!product.publishedAt) return false

  const tags = normalizeTags(product.tags)

  return !PRODUCT_HIDDEN_TAGS.some((tag) => tags.includes(tag))
}
