const getBlogsQuery = /* GraphQL */ `
  query getBlogs {
    blogs(first: 10) {
      nodes {
        id
        title
        handle
      }
    }
  }
`

export default getBlogsQuery
