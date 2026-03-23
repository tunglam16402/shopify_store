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

        titleImage: metafield(namespace: "custom", key: "title_image") {
          reference {
            __typename
            ... on MediaImage {
              image {
                url
                altText
                width
                height
              }
            }
          }
        }

        tileBanner: metafield(namespace: "custom", key: "tile_banner") {
          reference {
            __typename
            ... on MediaImage {
              image {
                url
                altText
                width
                height
              }
            }
            ... on Video {
              sources {
                url
                mimeType
                format
                width
                height
              }
              previewImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`

export default getDetailArticleQuery
