const getCollectionWithSortQuery = /* GraphQL */ `
  query getCollectionWithSort(
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
          createdAt
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export default getCollectionWithSortQuery
