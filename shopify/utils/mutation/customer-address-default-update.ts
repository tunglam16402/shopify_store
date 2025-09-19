const customerDefaultAddressUpdate = /* GraphQL */ `
  mutation customerDefaultAddressUpdate(
    $customerAccessToken: String!
    $addressId: ID!
  ) {
    customerDefaultAddressUpdate(
      customerAccessToken: $customerAccessToken
      addressId: $addressId
    ) {
      customer {
        id
        defaultAddress {
          id
        }
      }
      customerUserErrors {
        field
        code
        message
      }
      userErrors {
        field
        message
      }
    }
  }
`

export default customerDefaultAddressUpdate
