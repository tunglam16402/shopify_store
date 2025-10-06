import { Button } from '@/components/ui/Button'
import { BannerDocumentData, Simplify } from '@/prismicio-types'
import { ContentRelationshipField, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import styles from './style.module.css'

interface IHeroBanner {
  banners: ContentRelationshipField<
    'banner',
    string,
    Simplify<BannerDocumentData>
  >
}

const HeroSection: React.FC<IHeroBanner> = ({ banners }) => {
  if (!isFilled.contentRelationship(banners)) return null
  const firstBanner = banners?.data?.banner_image[0]

  console.log('firstBanner', firstBanner)

  if (!firstBanner) return null
  return (
    <section className={styles.hero_banner}>
      <div className="relative h-[60%] md:flex-1 md:h-full">
        <PrismicNextImage
          field={firstBanner.image}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className={styles.hero_text}>
        <h1 className="text-white font-extralight text-5xl md:text-6xl">
          {firstBanner.banner_title}
          <span className="font-[tangerine] text-6xl px-2">
            {firstBanner.banner_subtitle}
          </span>
          <wbr />
          <span> {firstBanner.banner_title2}</span>
        </h1>

        <span className="text-white font-semibold mt-6 md:text-lg">
          A season for connection, made with pieces designed for moments
          together.
        </span>
        <Link href={''}>
          <Button className="uppercase mt-6 px-12 md:px-16">
            Shop the fall edit
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
