const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    relatedProducts: productRecommendations(
      productId: $productId
      intent: RELATED
    ) {
      id
      title
      handle
      description
      publishedAt
      productType
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
    complementaryProducts: productRecommendations(
      productId: $productId
      intent: COMPLEMENTARY
    ) {
      id
      title
      handle
      description
      publishedAt
      productType
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
`

export default getProductRecommendationsQuery
