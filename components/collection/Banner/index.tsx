'use client'
import { ImageField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import SubBanner from './SubBanner'

export interface TileBanner {
  pathname: string
  image: ImageField
  label?: string
}

export interface BannerData {
  type: 'primary' | 'sub'
  image?: ImageField
  pathname?: string
  tiles?: TileBanner[]
  title?: string
  description?: string
  supportingText?: string
  CTAText?: string
  CTALink?: string
  bgColor?: string
}

const Banner = ({ bannerData }: { bannerData: BannerData }) => {
  if (bannerData.type === 'primary') {
    return (
      <section className="page-width">
        <Link href={bannerData.pathname || '#'}>
          <PrismicNextImage
            field={bannerData.image}
            alt=""
            fetchPriority="high"
            className="w-full object-contain rounded-2xl"
          />
        </Link>
      </section>
    )
  }

  return <SubBanner bannerData={bannerData} />
}

export default Banner
