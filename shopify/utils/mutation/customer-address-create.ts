const customerAddressCreateMutation = /* GraphQL */ `
    mutation customerAddressCreate(&customerAccessToken: String!, $address: MailingAddressInput!) {
        customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
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
                id
                address1
                city
                company
                country
                countryCodeV2
                firstName
                lastName
                phone
                province
                provinceCodeV2
                zip
            }
        }
    }
`

export default customerAddressCreateMutation
