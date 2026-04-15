const getProductsQuery = /* GraphQL */ `
  query getProducts($first: Int = 250, $after: String) {
    products(first: $first, after: $after) {
      nodes {
        id
        title
        handle
        description
        publishedAt
        category {
          name
        }
        tags

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
      pageInfo {
        hasNextPage
        
        endCursor
      }
    }
  }
`

export default getProductsQuery
