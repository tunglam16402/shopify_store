const getArticleByBlogQuery = /* GraphQL */ `
  query getArticleList($handle: String!) {
    blog(handle: $handle) {
      id
      title
      handle
      articles(first: 20, sortKey: PUBLISHED_AT) {
        nodes {
          id
          title
          handle
          excerpt
          publishedAt
          image {
            url
            altText
          }
          author {
            name
          }
        }
      }
    }
  }
`

export default getArticleByBlogQuery
