/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import styles from './style.module.css'

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
    <section className={styles.wrapper}>
      <Link href={pathname || '#'} className={styles.mainBanner}>
        <PrismicNextImage field={image} className={styles.mainImage} alt="" />
      </Link>
    </section>
  )
}

export default Banner
