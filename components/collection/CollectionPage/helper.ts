import { createClient } from '@/prismicio'
import { getMainMenu } from '@/shopify/api/operations/get-menu'

const isValidTime = (start?: string | null, end?: string | null) => {
  const now = Date.now()
  const startTime = start ? new Date(start).getTime() : -Infinity
  const endTime = end ? new Date(end).getTime() : Infinity
  return now >= startTime && now <= endTime
}

export const getBannerManagement = async () => {
  const client = createClient()
  return await client.getSingle('banner_management', {
    fetchOptions: { next: { revalidate: 600 } },
  })
}

export const getBannerData = async (slug?: string) => {
  const bannerManagementRes = await getBannerManagement()
  const slices = bannerManagementRes?.data?.slices

  const bannerSlice = slices?.find((slice) => {
    const { start_date, end_date, collection } = slice.primary

    const validTime = isValidTime(start_date, end_date)
    const validSlug = slug
      ? collection?.some((col) => col.collection_pathname === slug)
      : true

    return validTime && validSlug
  })

  const banner = bannerSlice?.primary
  if (!banner) return null

  const tiles = banner.tile_banner?.map((tile) => ({
    pathname: tile.tile_pathame || '#',
    image: tile.tile_banner_image,
    label: tile.tile_banner_button_label || '',
  }))

  return {
    image: banner.image,
    pathname: banner.pathname || '#',
    tiles: tiles || [],
    startDate: banner.start_date,
    endDate: banner.end_date,
  }
}

interface MenuItem {
  title: string
  url: string
  children?: MenuItem[]
}

interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage: boolean
}

export async function getBreadcrumbFromMenu(
  handle: string
): Promise<BreadcrumbItem[]> {
  const menu = await getMainMenu()
  const currentPath = `/collections/${handle}`

  const walk = (
    items: MenuItem[],
    trail: MenuItem[] = []
  ): MenuItem[] | null => {
    for (const item of items) {
      const next = [...trail, item]
      if (item.url === currentPath) return next
      if (item.children?.length) {
        const found = walk(item.children, next)
        if (found) return found
      }
    }
    return null
  }

  const path = walk(menu) || []

  const finalPath = path.length >= 3 ? [path[0], path[path.length - 1]] : path

  return finalPath.map((item, i) => ({
    label: item.title,
    href: i === finalPath.length - 1 ? undefined : item.url,
    isCurrentPage: i === finalPath.length - 1,
  }))
}
