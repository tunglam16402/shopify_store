import { CartCreateMutation, CartLinesAddMutation } from './../types/graphql'
import { shopifyFetch } from '../fetcher'
import { cartCreateMutation } from '../utils/mutation'
import cartLineAddMutation from '../utils/mutation/cart-line-add'

export async function createCart() {
  const data = await shopifyFetch<CartCreateMutation>({
    query: cartCreateMutation,
    variables: {
      input: {},
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
