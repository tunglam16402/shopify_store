const customerAddressUpdateMutation = /* GraphQL */ `
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      address: $address
      customerAccessToken: $customerAccessToken
      id: $id
    ) {
      customerAddress {
        address1
        address2
        city
        company
        country
        countryCodeV2
        firstName
        formatted(withCompany: false, withName: false)
        id
        lastName
        phone
        province
        provinceCode
        zip
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

export default customerAddressUpdateMutation
