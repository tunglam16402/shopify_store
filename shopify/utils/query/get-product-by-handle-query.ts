const getProductDetailQuery = /* GraphQL */ `
  query getProductDetail($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      metafield(namespace: "custom", key: "discount_percentage") {
        value
      }
      variants(first: 5) {
        edges {
          node {
            id
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
