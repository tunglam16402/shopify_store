import { createClient } from '@/prismicio'
import { Content } from '@prismicio/client'

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

export const getBannerData = async (
  slug?: string,
) => {
  const bannerManagementRes = await getBannerManagement()
  const slices = bannerManagementRes?.data?.slices

  const bannerSlice = slices?.find((slice) => {
    const {
      start_date,
      end_date,
      collection,
    } = slice.primary

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
