const predictiveSearchQuery = /* GraphQL */ `
  query predictiveSearch($query: String!) {
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
      }
    }
  }
`

export default predictiveSearchQuery
