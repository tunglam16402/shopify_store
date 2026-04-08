'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel'
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
      <Carousel className="h-full w-full">
        <CarouselContent>
          {banners.map((banner, index) => {
            const bg = banner.background_color || '#4f141f'
            return (
              <CarouselItem key={index} className="w-full">
                <div className="w-full" style={{ backgroundColor: bg }}>
                  <GiftGuideItem data={banner} />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default GiftGuide
