'use client'

import PWSwiper, { ONE_ITEMS_BREAKPOINTS } from '@/components/ui/Swiper'
import {
  HomepageDocumentDataHeroBannersItem,
  Simplify,
} from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import HeroBannerItem from './HeroBannerItem'

interface IHeroBanner {
  banners: GroupField<Simplify<HomepageDocumentDataHeroBannersItem>>
}

const HeroSection: React.FC<IHeroBanner> = ({ banners }) => {
  if (!banners?.length) return null

  return (
    <section className="mt-[111px] flex flex-col md:mt-0">
      <PWSwiper
        pagination={false}
        breakpoints={ONE_ITEMS_BREAKPOINTS}
        autoplay
        loop
        navigation={false}
      >
        {banners.map((banner, index) => (
          <HeroBannerItem
            heroBannerData={banner}
            firstBanner={index === 0}
            key={index}
          />
        ))}
      </PWSwiper>
    </section>
  )
}

export default HeroSection
