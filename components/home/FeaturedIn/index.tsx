import { HomepageDocumentDataFeatureInItem, Simplify } from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import React from 'react'

interface IFeaturedIn {
  features: GroupField<Simplify<HomepageDocumentDataFeatureInItem>>
}

const FeaturedIn: React.FC<IFeaturedIn> = ({ features }) => {
  const feature = features?.[0]

  if (!feature || (!feature.image && !feature.mobile_image)) {
    return null
  }

  return (
    <section className="relative w-full overflow-hidden">
      <h2 className="text-3xl md:text-[54px] text-center mt-12 md:mt-16">
        <span className="uppercase">featured </span>
        <span className="font-sub-heading font-bold text-4xl md:text-[54px]">
          in
        </span>
      </h2>
      <div className="mt-2">
        {feature.mobile_image && (
          <PrismicNextImage
            field={feature.mobile_image}
            alt=""
            className="md:hidden w-full h-auto object-contain"
          />
        )}

        {feature.image && (
          <PrismicNextImage
            field={feature.image}
            alt=""
            className="hidden md:block w-full h-auto object-contain"
          />
        )}
      </div>
    </section>
  )
}

export default FeaturedIn
