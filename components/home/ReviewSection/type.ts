export interface HomepageReviewProduct {
  id: string
  title: string
  handle: string
  image?: {
    url: string
    altText?: string | null
  }
}

export type HomepageReview = {
  id: string
  productId: string
  username: string
  rating: number
  headline: string
  comment: string
  createdAt: string
  voteUp: number
}

export type ReviewRow = {
  id: string
  product_id: string
  username: string
  rating: number
  headline: string
  comment: string
  created_at: string
  vote_up: number
}

export const REVIEWSECTION_BREAKPOINT = {
  0: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 14,
  },
  1024: {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 20,
  },
}
