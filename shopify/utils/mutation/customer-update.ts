const customerUpdateMutation = /* GraphQL */ `
  mutation customerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        message
        code
        field
      }
      userErrors {
        field
        message
      }
    }
  }
`

export default customerUpdateMutation
