import { CartCreateMutation } from './../types/graphql'
import { shopifyFetch } from '../fetcher'
import { cartCreateMutation } from '../utils/mutation'

export async function createCart(variantId: string, quantity: number) {
  const data = await shopifyFetch<CartCreateMutation>({
    query: cartCreateMutation,
    variables: {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      },
    },
  })

  return data.cartCreate?.cart
}
