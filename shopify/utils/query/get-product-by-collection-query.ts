const getProductByCollectionQuery = /* GraphQL */ `
  query getCollectionList($handle: String!) {
    collection(handle: $handle) {
      title
      description
      products(first: 250) {
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
  }
`

export default getProductByCollectionQuery
