/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cart, CartDisplayItem, CartLine } from '@/types/cart'

export function mapCartResponse(cartResponse: any): Cart {
  return {
    id: cartResponse.id,
    createdAt: cartResponse.createdAt,
    updatedAt: cartResponse.updatedAt,
    checkoutUrl: cartResponse.checkoutUrl,
    lines: cartResponse.lines.edges.map((e: any) => e.node),
    cost: cartResponse.cost,
  }
}

export const isPersonalizationFee = (line: CartLine) =>
  line.attributes?.some(
    (a) => a.key === 'line_type' && a.value === 'personalization_fee'
  )

// Link Custom fee and product line
export const getLinkId = (line: CartLine) =>
  line.attributes?.find((a) => a.key === 'link_id')?.value

export const getCustomFee = (cart: Cart, productLine: CartLine) => {
  const linkId = getLinkId(productLine)
  if (!linkId) return undefined

  return cart.lines.find(
    (line) => isPersonalizationFee(line) && getLinkId(line) === linkId
  )
}

export const getCartDisplayItems = (
  cart: Cart | null | undefined
): CartDisplayItem[] => {
  if (!cart) return []

  const productLines = cart.lines.filter((line) => !isPersonalizationFee(line))

  return productLines.map((line) => {
    const feeLine = getCustomFee(cart, line)
    const feeAmount = feeLine ? Number(feeLine.merchandise.price.amount) : 0

    const displayPrice = Number(line.merchandise.price.amount) + feeAmount

    const baseCompareAt = line.merchandise.compareAtPrice?.amount
    const displayComparedAtPrice = baseCompareAt
      ? Number(baseCompareAt) + feeAmount
      : undefined

    return {
      line,
      displayPrice,
      displayComparedAtPrice,
    }
  })
}
