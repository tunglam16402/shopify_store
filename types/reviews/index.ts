export interface Reviews {
  id: string
  username: string
  rating: number
  comment: string
  created_at: string
  product_id: string
}

export interface ReviewFormState {
  success: boolean
  errors?: { field?: string[]; message: string }[]
  review?: Reviews
}
