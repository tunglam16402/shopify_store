const customerAddressDeleteMutation = /* GraphQL */ `
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors {
        message
        code
        field
      }
      userErrors {
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`
export default customerAddressDeleteMutation
