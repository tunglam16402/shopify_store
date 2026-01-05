export interface ReviewMedia {
  id: string
  review_id: string
  url: string
  type: 'image' | 'video'
  created_at: string
}

export interface Reviews {
  id: string
  productId: string
  user_id: string
  username: string
  rating: number
  comment: string
  headline: string
  email: string
  quality: number
  value: number
  age_range: string
  recommend: string
  review_media: ReviewMedia[]
  created_at: string
  updated_at: string
  vote_up: number
  vote_down: number
}

export interface ReviewFormState {
  success: boolean
  errors?: { field?: string[]; message: string }[]
  review?: Reviews
}
