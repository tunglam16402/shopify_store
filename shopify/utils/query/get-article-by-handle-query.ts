const getDetailArticleQuery = /* GraphQL */ `
  query getDetailArticle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        id
        title
        handle
        excerpt
        contentHtml
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
`

export default getDetailArticleQuery
