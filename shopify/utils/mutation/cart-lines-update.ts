import { cartFragment } from '../query/get-cart-query'

const cartLinesUpdateMutation = /* GraphQL */ `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFragment
      }
      userErrors {
        code
        field
        message
      }
    }
  }

  ${cartFragment}
`

export default cartLinesUpdateMutation
