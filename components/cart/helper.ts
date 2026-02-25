import { CURRENCY_SYMBOL_MAP } from '@/lib/helper'
import { CartFragment } from '@/shopify/types/graphql'
import { Cart, CartDisplayItem, CartLine } from '@/types/cart'

type CartLineNode = CartFragment['lines']['edges'][number]['node']

export function mapCartResponse(cart: CartFragment): Cart {
  return {
    id: cart.id,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
    checkoutUrl: cart.checkoutUrl,
    lines: cart.lines.edges.map(({ node }: { node: CartLineNode }) => {
      const currencyCode = node.merchandise.price.currencyCode

      const attributes = node.attributes
        .filter((a) => typeof a.value === 'string')
        .map((a) => ({
          key: a.key,
          value: a.value!,
        }))

      const image = node.merchandise.image
        ? {
            url: node.merchandise.image.url,
            altText: node.merchandise.image.altText ?? '',
          }
        : null

      const category = node.merchandise.product.category
        ? {
            name: node.merchandise.product.category.name,
          }
        : {
            name: 'Uncategorized',
          }

      return {
        id: node.id,
        quantity: node.quantity,
        attributes: attributes.length ? attributes : undefined,
        merchandise: {
          id: node.merchandise.id,
          title: node.merchandise.title,

          price: {
            amount: Number(node.merchandise.price.amount),
            currencyCode: CURRENCY_SYMBOL_MAP[currencyCode] ?? currencyCode,
          },

          compareAtPrice: node.merchandise.compareAtPrice
            ? {
                amount: Number(node.merchandise.compareAtPrice.amount),
                currencyCode: CURRENCY_SYMBOL_MAP[currencyCode] ?? currencyCode,
              }
            : null,

          image: image,

          product: {
            id: node.merchandise.product.id,
            title: node.merchandise.product.title,
            handle: node.merchandise.product.handle,
            totalInventory: node.merchandise.product.totalInventory ?? 0,
            category,
          },
        },
      }
    }),

    cost: {
      totalAmount: {
        amount: Number(cart.cost.totalAmount.amount),
        currencyCode: CURRENCY_SYMBOL_MAP[cart.cost.totalAmount.currencyCode],
      },
      subtotalAmount: {
        amount: Number(cart.cost.subtotalAmount.amount),
        currencyCode:
          CURRENCY_SYMBOL_MAP[cart.cost.subtotalAmount.currencyCode],
      },
    },
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
