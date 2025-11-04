export type ProductCardProps = {
    id: string
    variantId: string
    title: string
    handle: string
    description: string
    category?: string
    imageUrl?: string
    altText?: string | null
    basePrice: number
    compareAtPrice?: number
    currency: string
    discountPercent: number
}