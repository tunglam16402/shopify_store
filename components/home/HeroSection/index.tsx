'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel'
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
      <Carousel className="h-full w-full">
        <CarouselContent>
          {banners.map((banner, index) => {
            return (
              <CarouselItem key={index} className="w-full">
                <div className="w-full">
                  <HeroBannerItem
                    heroBannerData={banner}
                    firstBanner={index === 0}
                  />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default HeroSection
