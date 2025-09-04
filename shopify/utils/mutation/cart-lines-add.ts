import { cartFragment } from '../query/get-cart-query'

const cartLineAddMutation = /* GraphQL */ `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
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

export default cartLineAddMutation
