import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Link from 'next/link'
import { FC } from 'react'

export type BannerTestProps = SliceComponentProps<Content.BannerTestSlice>

const BannerTest: FC<BannerTestProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-7xl px-4 py-20 text-center"
    >
      {slice.primary.image && (
        <PrismicNextImage
          field={slice.primary.image}
          className="mx-auto mb-8 rounded-lg"
          sizes="100vw"
          alt=""
        />
      )}

      {slice.primary.title && (
        <h2 className="text-6xl font-bold">{slice.primary.title}</h2>
      )}

      {slice.primary.description && (
        <div className="mt-8 text-3xl text-gray-600">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      {slice.primary.ctalink && (
        <Link
          href={slice.primary.ctalink}
          className="mt-8 inline-block rounded bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          {slice.primary.ctatext}
        </Link>
      )}
    </section>
  )
}

export default BannerTest
