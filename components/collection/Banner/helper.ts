import { createClient } from '@/prismicio'
import { cacheLife } from 'next/cache'
import { BannerData } from '.'

const isValidTime = (start?: string | null, end?: string | null) => {
  const now = Date.now()
  const startTime = start ? new Date(start).getTime() : -Infinity
  const endTime = end ? new Date(end).getTime() : Infinity
  return now >= startTime && now <= endTime
}

export const getBannerManagement = async () => {
  'use cache'
  cacheLife('hours')
  const client = createClient()
  return await client.getSingle('banner_management', {
    fetchOptions: { cache: 'force-cache' },
  })
}

export const getBannerData = async (
  slug?: string
): Promise<BannerData | null> => {
  'use cache'
  cacheLife('hours')

  const bannerManagementRes = await getBannerManagement()
  const data = bannerManagementRes?.data
  if (!data) return null

  const slices = data.slices

  const bannerSlice = slices?.find((slice) => {
    const { start_date, end_date, collection } = slice.primary

    const validTime = isValidTime(start_date, end_date)
    const validSlug = slug
      ? collection?.some((col) => col.collection_pathname === slug)
      : true

    return validTime && validSlug
  })

  if (bannerSlice?.primary) {
    const banner = bannerSlice.primary

    return {
      type: 'primary',
      image: banner.image,
      pathname: banner.pathname || '#',
      tiles:
        banner.tile_banner?.map((tile) => ({
          pathname: tile.tile_pathame || '#',
          image: tile.tile_banner_image,
          startAfterRow: tile.start_after_row || 1,
        })) || [],
    }
  }

  if (data.title || data.description || data.supporting_text) {
    return {
      type: 'sub',
      title: data.title || '',
      description: data.description || '',
      supportingText: data.supporting_text || '',
      CTAText: data.ctatext ?? undefined,
      CTALink: data.ctalink ?? undefined,
      bgColor: data.background_color ?? undefined,
    }
  }

  return null
}
