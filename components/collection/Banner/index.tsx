'use client'
import { ImageField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'

export interface TileBanner {
  pathname: string
  image: ImageField
  label?: string
}

export interface BannerData {
  image: ImageField
  pathname: string
  tiles: TileBanner[]
}

const Banner = ({ bannerData }: { bannerData: BannerData }) => {
  const { image, pathname } = bannerData

  console.log('bannerData :>> ', bannerData);

  return (
    <section>
      <Link href={pathname || '#'}>
        <PrismicNextImage field={image} alt="" fetchPriority="high" className='w-full object-contain rounded-2xl'/>
      </Link>
    </section>
  )
}

export default Banner
