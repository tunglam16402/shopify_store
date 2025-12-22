import { cartFragment } from '../query/get-cart-query'

const cartBuyerIdentityUpdateMutation = /* GraphQL */ `
  mutation cartBuyerIdentityUpdate(
    $buyerIdentity: CartBuyerIdentityInput!
    $cartId: ID!
  ) {
    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }

  ${cartFragment}
`
export default cartBuyerIdentityUpdateMutation
