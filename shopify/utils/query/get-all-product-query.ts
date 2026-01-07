const getProductsQuery = /* GraphQL */ `
  query getProducts {
    products(first: 250) {
      nodes {
        id
        title
        handle
        description
        publishedAt
        category {
          name
        }
        collections(first: 1) {
          nodes {
            id
            handle
            title
          }
        }
        images(first: 2) {
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
