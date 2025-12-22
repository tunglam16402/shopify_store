export interface ReviewFilter {
  age?: Array<string>
  rating?: Array<string>
  recommend?: Array<string>
  withMedia?: boolean
}

export interface Reviews {
  productId: string
  filters: ReviewFilter
  search: string
  sort: string
  page: number
  limit: number
}
