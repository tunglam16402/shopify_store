export const cartFragment = /* GraphQL */ `
  fragment cartFragment on Cart {
    id
    createdAt
    updatedAt
    checkoutUrl
    lines(first: 250) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              quantityAvailable
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
              product {
                id
                handle
                title
                totalInventory
              }
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    attributes {
      key
      value
    }
  }
`
