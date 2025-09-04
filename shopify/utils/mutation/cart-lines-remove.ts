import { cartFragment } from '../query/get-cart-query'

const cartLinesRemoveMutation = /* GraphQL */ `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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

export default cartLinesRemoveMutation
