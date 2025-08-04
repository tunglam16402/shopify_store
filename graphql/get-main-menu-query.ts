const getMainMenuQuery = /* GraphQL */ `
  query getMainMenu {
    menu(handle: "main-menu") {
      items {
        title
        url
        type
      }
    }
  }
`

export default getMainMenuQuery
