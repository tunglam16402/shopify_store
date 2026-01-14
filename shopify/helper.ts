import { ProductFilter } from "./types/graphql"

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

      case 'price': {
        const [min, max] = value.split('-').map(Number)
        filters.push({
          price: {
            min: isNaN(min) ? undefined : min,
            max: isNaN(max) ? undefined : max,
          },
        })
        break
      }

      default:
        break
    }
  }

  return filters
}
