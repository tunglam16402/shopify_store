import { FilterType } from "@/shopify/types/graphql"

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

export interface Facets {
  id: string
  label: string
  type: FilterType
  values: Array<{
    id: string
    label: string
    count: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: any
  }>
}[]
