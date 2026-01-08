export type GrandChildItem = {
  title: string
  url: string
  image?: string[]  
}

export type ChildItem = {
  title: string
  url: string
  children?: GrandChildItem[]
}

export type MenuItem = {
  title: string
  url: string
  children?: ChildItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
}