const customerAddressCreateMutation = /* GraphQL */ `
    mutation customerAddressCreate(&customerAccessToken: String!, $address: MailingAddressInput!) {
        customerAddressCreate(
            customerAccessToken: $customerAccessToken, address: $address) {
            customerUserErrors {
                code
                field
                message
            }
            userErrors{
                field
                message
            }
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
        }
    }
`

export default customerAddressCreateMutation
