// 'use client'

// import { PrismicNextImage } from '@prismicio/next'
// import Link from 'next/link'
// import { Button } from '@/components/ui/Button'
// import styles from './style.module.css'

// interface IHeroBanner {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   banners: any[]
// }

// const HeroSection: React.FC<IHeroBanner> = ({ banners }) => {
//   return (
//     <section className={styles.hero_banner}>
//       {banners.map((banner, index) => {
//         const data = banner.primary
//         return (
//           <div
//             key={data.banner_id || index}
//             className="relative h-[60%] md:flex-1 md:h-full"
//           >
//             <PrismicNextImage
//               field={data.image}
//               fill
//               className="object-cover"
//               priority={index === 0}
//             />
//             <div className={styles.hero_text}>
//               <h1 className="text-white font-extralight text-5xl md:text-6xl">
//                 {data.title}
//                 {data.sub_title && (
//                   <span className="font-[tangerine] text-6xl px-2">
//                     {data.sub_title}
//                   </span>
//                 )}
//               </h1>
//               {data.cta_text && (
//                 <Link href={data.link?.url || '#'}>
//                   <Button className="uppercase mt-6 px-12 md:px-16">
//                     {data.cta_text}
//                   </Button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         )
//       })}
//     </section>
//   )
// }

// export default HeroSection

// 'use client'

// import styles from './style.module.css'
// import HeroBannerItem from './HeroBannerItem'
// import { GroupField } from '@prismicio/client'
// import { HomepageDocumentDataHeroBannersItem, Simplify } from '@/prismicio-types'

// interface IHeroBanner {
//   banners: GroupField<Simplify<HomepageDocumentDataHeroBannersItem>>
// }

// const HeroSection: React.FC<IHeroBanner> = ({ banners }) => {
//   if (!banners?.length) return null

//   return (
//     <section className={styles.hero_banner}>
//       {banners.map((banner, index) => (
//         <HeroBannerItem
//           key={ index}
//           data={banner}
//         />
//       ))}
//     </section>
//   )
// }

// export default HeroSection

'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import HeroBannerItem from './HeroBannerItem'
import { GroupField } from '@prismicio/client'
import { HomepageDocumentDataHeroBannersItem, Simplify } from '@/prismicio-types'
import styles from './style.module.css'

interface IHeroBanner {
  banners: GroupField<Simplify<HomepageDocumentDataHeroBannersItem>>
}

const HeroSection: React.FC<IHeroBanner> = ({ banners }) => {
  if (!banners?.length) return null

  return (
    <section className={styles.hero_banner}>
      <Carousel className="w-full h-full">
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="w-full">
              <HeroBannerItem data={banner} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default HeroSection

