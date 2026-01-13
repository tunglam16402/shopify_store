const getProductByCollectionQuery = /* GraphQL */ `
  query getCollectionList(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      id
      title
      products(first: 250, sortKey: $sortKey, reverse: $reverse) {
        nodes {
          id
          title
          handle
          publishedAt
          description
          category {
            name
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
  }
`

export default getProductByCollectionQuery
