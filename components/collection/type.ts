export interface Collection {
  title: string
  handle: string
  description: string
}

export interface CategoryMenu {
  title: string
  url: string
  collections?: {
    title: string
    url: string
    image?: string
  }[]
}
