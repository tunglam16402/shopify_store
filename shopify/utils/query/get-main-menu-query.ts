const getMainMenuQuery = /* GraphQL */ `
  query getMainMenu {
    menu(handle: "header-menu") {
      id
      title
      items {
        id
        title
        type
        url
        items {
          id
          title
          type
          url
          items {
            id
            title
            type
            url
            resource {
              __typename
              ... on Collection {
                handle
                title
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`

export default getMainMenuQuery
