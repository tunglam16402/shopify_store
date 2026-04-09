'use client'

import PWSwiper, { ONE_ITEMS_BREAKPOINTS } from '@/components/ui/Swiper'
import { HomepageDocumentDataBannersItem, Simplify } from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import GiftGuideItem from './GiftGuideItem'

interface IGiftGuide {
  banners: GroupField<Simplify<HomepageDocumentDataBannersItem>>
}

const GiftGuide: React.FC<IGiftGuide> = ({ banners }) => {
  if (!banners?.length) return null

  return (
    <section className="flex h-[calc(100dvh-100px)] flex-col gap-8 bg-[#4f141f] md:h-dvh md:flex-row md:gap-0">
      <PWSwiper
        pagination={false}
        breakpoints={ONE_ITEMS_BREAKPOINTS}
        className="h-full w-full"
      >
        {banners.map((banner, index) => {
          const bg = banner.background_color || '#4f141f'
          return (
            <div style={{ backgroundColor: bg }} key={index}>
              <GiftGuideItem data={banner} />
            </div>
          )
        })}
      </PWSwiper>
    </section>
  )
}

export default GiftGuide
