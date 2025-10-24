'use client'

import { ImageField } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"

interface IVideoBanner {
  field?: ImageField | null
}

const VideoBanner = ({ field }: IVideoBanner) => {
  if (!field) return null

  return (
    <PrismicNextImage alt="" field={field} className="relative object-cover h-[240px] md:h-full"/>
  )
}

export default VideoBanner
