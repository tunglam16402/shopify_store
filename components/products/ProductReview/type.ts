export interface ReviewFilter {
  age?: Array<string>
  rating?: Array<string>
  recommend?: Array<string>
  withMedia?: boolean
}

export interface ReviewQuery {
  productId: string
  filters: ReviewFilter
  search: string
  sort: string
  page: number
  limit: number
}

export interface Summary {
  avgRating: number
  totalReviews: number
  breakdown: Record<1 | 2 | 3 | 4 | 5, number>
}

export interface TotalRatingProps {
  summary: Summary
  onOpenForm: () => void
  verifiedBuyer: boolean
  hasReviewed: boolean
}

// export interface ReviewMedia {
//   id: string
//   type: 'image' | 'video'
//   url: string
// }

// export interface ReviewVote {
//   up: number
//   down: number
// }

// export interface ReviewEntity {
//   id: string
//   productId: string
//   email: string
//   user_id: string
//   username: string
//   isVerifiedBuyer: boolean

//   rating: number
//   headline: string
//   comment: string
//   age_range: string
//   quality?: number
//   value?: number
//   recommend?: 'yes' | 'no'

//   review_media?: ReviewMedia[]
//   vote?: ReviewVote

//   created_at: string
//   updated_at?: string
// }
