// app/shopify/queries/getProductDetailQuery.ts
const getProductDetailQuery = /* GraphQL */ `
  query getProductDetail($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      collections(first: 100) {
        nodes {
          id
          handle
          title
        }
      }
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        nodes {
          url
          altText
        }
      }

      variants(first: 1) {
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
          }
        }
      }

      # metafield product reference list (color variants)
      colorVariants: metafield(namespace: "custom", key: "color_variants") {
        references(first: 10) {
          nodes {
            ... on Product {
              handle
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }

      productInfo: metafield(namespace: "custom", key: "product_information") {
        value
        type
      }
    }
  }
`
export default getProductDetailQuery
