const getProductsQuery = /* GraphQL */ `
  query getProducts {
    products(first: 6) {
      nodes {
        id
        title
        handle
        description
        images(first: 1) {
          nodes {
            url
            altText
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`

export default getProductsQuery
