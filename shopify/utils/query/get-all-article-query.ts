const getAllAriclesQuery = /* GraphQL */ `
  query GetAllArticles {
    articles(first: 50, sortKey: PUBLISHED_AT) {
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
