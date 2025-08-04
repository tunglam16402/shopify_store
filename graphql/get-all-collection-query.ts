const getAllCollectionQuery = /* GraphQL */ `
  query getAllCollection {
    collections(first: 10) {
      nodes {
        handle
        title
      }
    }
  }
`

export default getAllCollectionQuery
