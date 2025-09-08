import {
  CartCreateMutation,
  CartLinesAddMutation,
  CartLinesRemoveMutation,
  CartLinesUpdateMutation,
  GetCheckoutQuery,
} from './../types/graphql'
import { shopifyFetch } from '../fetcher'
import { cartCreateMutation } from '../utils/mutation'
import cartLineAddMutation from '../utils/mutation/cart-lines-add'
import cartLinesUpdateMutation from '../utils/mutation/cart-lines-update'
import cartLinesRemoveMutation from '../utils/mutation/cart-lines-remove'
import getCheckoutQuery from '../utils/query/get-checkout-query'

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
  quantity = 1
) {
  const data = await shopifyFetch<CartLinesAddMutation>({
    query: cartLineAddMutation,
    variables: {
      cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity,
        },
      ],
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

  console.log('updateCartLine raw response:', JSON.stringify(data, null, 2))

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
