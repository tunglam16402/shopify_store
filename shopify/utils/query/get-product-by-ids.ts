const getProductsByIdsQuery = /* GraphQL */ `
  query getProductsByIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      __typename
      ... on Product {
        id
        title
        handle
        description
        publishedAt
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
`

export default getProductsByIdsQuery
