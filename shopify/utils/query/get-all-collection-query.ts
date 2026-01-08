const getAllCollectionQuery = /* GraphQL */ `
  query getAllCollection {
    collections(first: 10) {
      nodes {
        handle
        title
        description
      }
    }
  }
`

export default getAllCollectionQuery
