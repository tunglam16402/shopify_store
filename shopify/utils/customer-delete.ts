const customerDeleteMutation = /* GraphQL */ `
  mutation customerDelete($id: ID!) {
    customerDelete(input: { id: $id }) {
      shop {
        id
      }
      userErrors {
        field
        message
      }
      deletedCustomerId
    }
  }
`

export default customerDeleteMutation
