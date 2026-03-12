export type ProductCardProps = {
  id: string
  variantId: string
  title: string
  vendor?: string
  handle: string
  description: string
  category?: string
  tags?: string
  images?: {
    url: string
    altText?: string | null
  }[]

  basePrice: number
  compareAtPrice?: number
  currency: string
  discountPercent?: number
}
