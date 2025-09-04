const getAllAriclesQuery = /* GraphQL */ `
  query getAllArticles {
    articles(first: 99, sortKey: PUBLISHED_AT) {
      nodes {
        id
        title
        handle
        excerpt
        publishedAt
        blog {
          handle
          title
        }
        author {
          name
        }
        image {
          url
          altText
        }
      }
    }
  }
`

export default getAllAriclesQuery
