const getCustomerQuery = /* GraphQL */ `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      createdAt
      acceptsMarketing
      defaultAddress {
        id
        address1
        address2
        city
        company
        country
        countryCodeV2
        firstName
        lastName
        phone
        province
        provinceCode
        zip
      }
      orders(first: 100) {
        nodes {
          id
          name
          totalPrice {
            amount
            currencyCode
          }
          processedAt
          customerUrl
          lineItems(first: 10) {
            nodes {
              quantity
              variant {
                id
                product {
                  id
                  title
                  handle
                  category {
                    name
                  }
                  images(first: 1) {
                    nodes {
                      url
                      altText
                    }
                  }
                  variants(first: 1) {
                    nodes {
                      id
                      sku
                      title
                      quantityAvailable
                      price {
                        amount
                      }
                      compareAtPrice {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
          shippingAddress {
            address1
            firstName
            lastName
            zip
            province
            phone
          }
          email
        }
      }
      addresses(first: 100) {
        nodes {
          id
          address1
          address2
          city
          country
          company
          firstName
          lastName
          phone
          province
          provinceCode
          name
          zip
          formatted(withCompany: true, withName: true)
        }
      }
    }
  }
`

export default getCustomerQuery
