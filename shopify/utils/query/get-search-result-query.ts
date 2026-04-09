const getSearchResultQuery = /* GraphQL */ `
  query getSearchResult(
    $query: String!
    $sortKey: SearchSortKeys
    $reverse: Boolean
    $first: Int = 24
    $globalFilters: [ProductFilter!]
    $filters: [ProductFilter!]
  ) {
    globalPriceRange: search(
      query: $query
      types: PRODUCT
      first: 1
      productFilters: $globalFilters
    ) {
      productFilters {
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

    searchResult: search(
      query: $query
      types: PRODUCT
      first: $first
      sortKey: $sortKey
      reverse: $reverse
      productFilters: $filters
    ) {
      edges {
        node {
          ... on Product {
            id
            title
            handle
            description
            publishedAt
            tags
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
        }
      }

      productFilters {
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
`

export default getSearchResultQuery