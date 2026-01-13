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
