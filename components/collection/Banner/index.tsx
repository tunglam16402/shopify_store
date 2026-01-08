/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'

interface TileBanner {
  pathname: string
  image: any
  label?: string
}

interface BannerData {
  image: any
  pathname: string
  tiles: TileBanner[]
}

const Banner = ({ bannerData }: { bannerData: BannerData }) => {
  const { image, pathname } = bannerData

  return (
    <section>
      <Link href={pathname || '#'}>
        <PrismicNextImage field={image} alt="" fetchPriority="high" className='w-full object-contain rounded-2xl'/>
      </Link>
    </section>
  )
}

export default Banner
