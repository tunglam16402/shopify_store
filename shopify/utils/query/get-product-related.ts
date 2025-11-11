const getRelatedProductsQuery = /* GraphQL */ `
  query getRelatedProducts($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      description
      publishedAt
      productType
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
`

export default getRelatedProductsQuery
