const getPredictiveSearchQuery = /* GraphQL */ `
  query getPredictiveSearch($query: String!) {
    predictiveSearch(query: $query, types: [PRODUCT], limit: 5) {
      products {
        id
        title
        handle
        images(first: 1) {
          nodes {
            url
          }
        }
        featuredImage {
          url
        }
      }
    }
  }
`

export default getPredictiveSearchQuery
