const getPredictiveSearchQuery = /* GraphQL */ `
  query getPredictiveSearch($query: String!) {
    predictiveSearch(query: $query, types: [PRODUCT], limit: 5) {
      products {
        id
        title
        handle
        description
        publishedAt
        tags
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
export default getPredictiveSearchQuery
