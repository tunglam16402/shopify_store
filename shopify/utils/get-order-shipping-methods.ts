const getShippingMehtodsQuery = /* GraphQL */ `
  query OrderShippingMethods($id: ID!) {
    order(id: $id) {
      shippingLines(first: 10, includeRemovals: true) {
        edges {
          node {
            title
          }
        }
      }
    }
  }
`
export default getShippingMehtodsQuery
