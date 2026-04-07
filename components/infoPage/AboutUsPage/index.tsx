import { AnimatedGroup } from '@/components/common/AnimatedGroup'
import StyledHeading from '@/components/ui/StyledHeading'
import { cn } from '@/lib/utils'
import { AboutDocumentData, Simplify } from '@/prismicio-types'
import { PrismicNextImage } from '@prismicio/next'
import { FC } from 'react'

type Props = {
  aboutUsData: Simplify<AboutDocumentData>
}

const AboutUsPage: FC<Props> = ({ aboutUsData }) => {
  if (!aboutUsData) return null
  return (
    <section className="layout-width mobile-mt space-y-8 md:space-y-0">
      <h1 className="font-sub-heading text-center text-5xl leading-none font-medium tracking-[-0.02em] text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl">
        About Us
      </h1>

      {aboutUsData.about_us.map((about, index) => {
        const isReverse = index % 2 === 1
        return (
          <AnimatedGroup key={index}>
            <div className="mt-20 flex flex-col items-center gap-10 md:flex-row md:gap-20">
              <PrismicNextImage
                field={about.image}
                alt={''}  
                className={cn(
                  'md:w-1/2',
                  isReverse ? 'md:order-1' : 'md:order-2'
                )}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <p
                className={cn(
                  'text-center font-semibold tracking-tight md:w-1/2 md:text-lg',
                  isReverse ? 'md:order-2' : 'md:order-1'
                )}
              >
                {about.description}
              </p>
            </div>
          </AnimatedGroup>
        )
      })}

      <div className="mt-10 flex flex-col items-center gap-4 md:mt-16 md:gap-6">
        <StyledHeading
          text="From Hanoi with love"
          headingClass=" text-4xl md:text-5xl font-sub-heading font-light"
          subHeadingClass=" text-3xl md:text-5xl uppercase "
        />
        <p className="text-lg uppercase md:text-xl">printwork team</p>
      </div>
    </section>
  )
}

export default AboutUsPage
