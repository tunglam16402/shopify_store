'use server'

import { getProductRecommendations } from '@/shopify/api/operations/get-product'

export async function getCartRecommendations(productId: string) {
  if (!productId) return null

  const recommendation = await getProductRecommendations(productId)

  return recommendation.data
}
