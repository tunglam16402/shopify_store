import { cartFragment } from './get-cart-query'

const getCheckoutQuery = /* GraphQL */ `
  query getCheckout($cartId: ID!) {
    cart(id: $cartId) {
      ...cartFragment
    }
  }
  ${cartFragment}
`

export default getCheckoutQuery
