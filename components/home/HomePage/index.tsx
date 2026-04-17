import { HomepageDocumentData, Simplify } from '@/prismicio-types'
import HeroSection from '../HeroSection'
import FeaturedCollections from '../FeaturedCollection'
import FeaturedProduct from '../FeaturedProduct'
import VideoSection from '../VideoSection'
import FeaturedIn from '../FeaturedIn'
import Blogs from '../Blogs'
import USPs from '../USPs'
import ReviewSection from '../ReviewSection'
import { AnimatedSection } from '@/components/common/AnimatedSection'
import GiftGuide from '../GiftGuide'

interface IHomePage {
  data: Simplify<HomepageDocumentData>
}

const HomePage: React.FC<IHomePage> = ({ data }) => {
  const latestSection = data.product_section?.find(
    (s) => s.widget_id === 'latest'
  )

  const bestsellerSection = data.product_section?.find(
    (s) => s.widget_id === 'bestseller'
  )

  console.log('bestsellerSection', bestsellerSection)
  return (
    <div>
      <HeroSection banners={data.hero_banners} />

      <AnimatedSection variant="fade-up" delay={0}>
        <FeaturedCollections collections={data.collections} />
      </AnimatedSection>

      {bestsellerSection && (
        <AnimatedSection variant="fade-up" delay={0}>
          <FeaturedProduct products={[bestsellerSection]} />
        </AnimatedSection>
      )}

      <AnimatedSection variant="scale-up" duration={900}>
        <VideoSection videos={data.video_banner} />
      </AnimatedSection>

      <AnimatedSection variant="fade-up">
        <GiftGuide banners={data.banners} />
      </AnimatedSection>

      {latestSection && (
        <AnimatedSection variant="fade-up" delay={100}>
          <section className="mx-auto max-w-[1440px]">
            <FeaturedProduct products={[latestSection]} />
          </section>
        </AnimatedSection>
      )}

      <AnimatedSection variant="fade-right" duration={800}>
        <FeaturedIn features={data.feature_in} />
      </AnimatedSection>

      <AnimatedSection variant="fade-up">
        <USPs usps={data.usp} />
      </AnimatedSection>

      <AnimatedSection variant="fade-up" delay={50}>
        <Blogs blogs={data.blog} />
      </AnimatedSection>

      <AnimatedSection variant="fade-up" delay={50}>
        <ReviewSection />
      </AnimatedSection>
    </div>
  )
}

export default HomePage
