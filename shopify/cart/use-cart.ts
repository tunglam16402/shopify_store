'use server'

import { cookies } from 'next/headers'
import { shopifyFetch } from '../fetcher'
import {
  cartBuyerIdentityUpdateMutation,
  cartCreateMutation,
} from '../utils/mutation'
import cartLineAddMutation from '../utils/mutation/cart-lines-add'
import cartLinesRemoveMutation from '../utils/mutation/cart-lines-remove'
import cartLinesUpdateMutation from '../utils/mutation/cart-lines-update'
import getCheckoutQuery from '../utils/query/get-checkout-query'
import {
  CartBuyerIdentityInput,
  CartBuyerIdentityUpdateMutation,
  CartCreateMutation,
  CartLinesAddMutation,
  CartLinesRemoveMutation,
  CartLinesUpdateMutation,
  GetCheckoutQuery,
} from './../types/graphql'

export interface CartLinePersonalizationPayload {
  values: Record<string, string>

  productImage?: string

  textBlock?: {
    lines: {
      id: string
      label: string
    }[]
  }

  position?: {
    x: number
    y: number
  }

  font: string
  fontSize: string
  fontWeight: string
  color: string
}

export async function createCart() {
  const data = await shopifyFetch<CartCreateMutation>({
    query: cartCreateMutation,
    variables: {
      input: {
        attributes: [
          {
            key: '_returnUrl',
            value: 'https://headless-frontend.com',
          },
        ],
      },
    },
  })

  return data.cartCreate?.cart
}

export async function addCartLine(
  cartId: string,
  variantId: string,
  quantity = 1,
  personalization?: CartLinePersonalizationPayload
) {
  // get shopify cookies

  const cookie = await cookies()
  const shopifyY = cookie?.get('_shopify_y')?.value
  const shopifyS = cookie?.get('_shopify_s')?.value

  const lines = [
    {
      merchandiseId: variantId,
      quantity,
      ...(personalization && {
        attributes: [
          {
            key: 'personalization_config',
            value: JSON.stringify(personalization),
          },
        ],
      }),
    },
  ]

  const data = await shopifyFetch<CartLinesAddMutation>({
    query: cartLineAddMutation,
    variables: {
      cartId,
      lines,
    },
    headers: {
      ...(shopifyY &&
        shopifyS && {
          cookie: `_shopify_y=${shopifyY}; _shopify_s=${shopifyS};`,
        }),
    },
  })

  return data
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
) {
  const data = await shopifyFetch<CartLinesUpdateMutation>({
    query: cartLinesUpdateMutation,
    variables: {
      cartId,
      lines: [
        {
          id: lineId,
          quantity,
        },
      ],
    },
  })

  if (data?.cartLinesUpdate?.userErrors?.length) {
    console.error('Cart update errors:', data.cartLinesUpdate.userErrors)
  }
  return data
}

export async function removeCartLine(cartId: string, lineIds: string[]) {
  const data = await shopifyFetch<CartLinesRemoveMutation>({
    query: cartLinesRemoveMutation,
    variables: {
      cartId,
      lineIds,
    },
  })

  return data
}

export async function getCartById(cartId: string) {
  const data = await shopifyFetch<GetCheckoutQuery>({
    query: getCheckoutQuery,
    variables: {
      cartId,
    },
  })

  return data.cart
}

export async function attachCartToCustomer(
  cartId: string,
  buyerIdentity: CartBuyerIdentityInput
) {
  const data = await shopifyFetch<CartBuyerIdentityUpdateMutation>({
    query: cartBuyerIdentityUpdateMutation,
    variables: {
      cartId,
      buyerIdentity,
    },
  })

  const cart = data?.cartBuyerIdentityUpdate?.cart
  const userErrors = data?.cartBuyerIdentityUpdate?.userErrors

  if (!cart)
    throw new Error('cartBuyerIdentityUpdate returned null or undefined')
  if (userErrors && userErrors.length > 0) {
    throw new Error(userErrors.map((e) => e.message).join(', '))
  }

  return cart
}
