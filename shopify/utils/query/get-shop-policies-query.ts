const getShopPoliciesQuery = /* GraphQL */ `
  query getShopPolicies {
    shop {
      refundPolicy {
        title
        body
        url
      }
      privacyPolicy {
        title
        body
        url
      }
      termsOfService {
        title
        body
        url
      }
      shippingPolicy {
        title
        body
        url
      }
    }
  }
`

export default getShopPoliciesQuery
