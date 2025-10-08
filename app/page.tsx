import HomePage from '@/components/home/HomePage'
import { createClient } from '@/prismicio'
import { isFilled } from '@prismicio/client'

const Home = async () => {
  const client = createClient()
  const homepage = await client.getSingle('homepage')

  const bannerSource = homepage.data.hero_banners

  const bannerDoc = Array.isArray(bannerSource) ? bannerSource[0] : bannerSource

  if (!isFilled.contentRelationship(bannerDoc)) {
    return <div>Missing banner source</div>
  }
  const bannerLibrary = await client.getSingle('banner_management')

  const selectedIds = homepage.data.selected_banners
    ?.split(',')
    .map((id: string) => id.trim())

  const visibleBanners = bannerLibrary.data.slices.filter((slice: any) =>
    selectedIds?.includes(slice.primary.banner_id)
  )

  return <HomePage data={homepage.data} banners={visibleBanners} />
}

export default Home
