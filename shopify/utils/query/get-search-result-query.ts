const getSearchResultQuery = /* GraphQL */ `
  query getSearchResult($query: String!) {
    search(query: $query, types: PRODUCT, first: 6) {
      edges {
        node {
          ... on Product {
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
    }
  }
`

export default getSearchResultQuery
