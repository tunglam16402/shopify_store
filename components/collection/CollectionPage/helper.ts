import { getCategoryMenus } from '@/shopify/api/operations/get-menu'
import { BreadcrumbItem } from '@/types/collection/menuCollection'
import { CategoryMenu } from '../type'

export async function getBreadcrumbFromMenu(
  handle: string
): Promise<BreadcrumbItem[]> {
  const flatMenu = await getCategoryMenus()

  const currentUrl = `/collections/${handle}`

  for (const parent of flatMenu) {
    const current = parent?.collections?.find((col) => col.url === currentUrl)

    if (current) {
      return [
        { label: parent.title, href: parent.url, isCurrentPage: false },
        { label: current.title, isCurrentPage: true },
      ]
    }

    if (parent.url === currentUrl) {
      return [{ label: parent.title, isCurrentPage: true }]
    }
  }

  return []
}

export async function getSubCategory(
  categoryMenus: CategoryMenu[],
  handle: string
): Promise<CategoryMenu | null> {
  const currentPath = `/collections/${handle}`

  const category = categoryMenus.find((cat) => cat.url === currentPath)

  if (!category || category?.collections?.length === 0) return null

  return category
}

export function parseFacetInput(input: string): {
  param: string
  value?: string
} | null {
  try {
    const parsed = JSON.parse(input)

    const [key] = Object.keys(parsed)
    if (!key) return null

    if (key === 'price') return null

    if (parsed.taxonomyMetafield) {
      return {
        param: 'ageGroup',
        value: parsed.taxonomyMetafield.value, 
      }
    }

    return {
      param: key,
      value: String(parsed[key]),
    }
  } catch {
    return null
  }
}
