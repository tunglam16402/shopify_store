const searchResultQuery = /* GraphQL */ `
  query search($query: String!) {
    search(query: $query, first: 20) {
      nodes {
        __typename
        ... on Product {
          id
          title
          handle
          images(first: 1) {
            nodes {
              url
              altText
            }
          }
        }
      }
    }
  }
`

export default searchResultQuery
