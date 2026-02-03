const getSearchResultQuery = /* GraphQL */ `
  query getSearchResult($query: String!) {
    search(query: $query, types: PRODUCT, first: 50) {
      edges {
        node {
          ... on Product {
            id
            title
            handle
            description
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
        }
      }
    }
  }
`

export default getSearchResultQuery
