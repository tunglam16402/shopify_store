const getProductByCollectionQuery = /* GraphQL */ `
  query getProductByCollection(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $first: Int = 24
    $filters: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      id
      title
      products(
        first: $first
        sortKey: $sortKey
        filters: $filters
        reverse: $reverse
      ) {
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

          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
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

        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
      }
    }
  }
`

export default getProductByCollectionQuery
