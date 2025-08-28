const getProductDetailQuery = /* GraphQL */ `
  query getProductDetail($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      images(first: 5) {
        nodes {
          url
          altText
        }
      }
      variants(first: 5) {
        edges {
          node {
            id
            title
            sku
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`
export default getProductDetailQuery
