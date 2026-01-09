export function parseSort(sort?: string) {
  switch (sort) {
    case 'newest':
      return { sortKey: 'CREATED', reverse: true }

    case 'price-asc':
      return { sortKey: 'PRICE', reverse: false }

    case 'price-desc':
      return { sortKey: 'PRICE', reverse: true }

    case 'title-asc':
      return { sortKey: 'TITLE', reverse: false }

    case 'title-desc':
      return { sortKey: 'TITLE', reverse: true }

    default:
      return { sortKey: 'BEST_SELLING', reverse: false }
  }
}
