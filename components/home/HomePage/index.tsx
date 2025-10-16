import { HomepageDocumentData, Simplify } from '@/prismicio-types'
import HeroSection from '../HeroSection'
import FeaturedCollections from '../FeaturedCollection'
import FeaturedProduct from '../FeaturedProduct'
import VideoSection from '../VideoSection'

interface IHomePage {
  data: Simplify<HomepageDocumentData>
}

const HomePage: React.FC<IHomePage> = ({ data }) => {
  const bestSellerSection = data.product_section?.find(
    (s) => s.widget_id === 'bestseller'
  )
  const latestSection = data.product_section?.find(
    (s) => s.widget_id === 'latest'
  )

  return (
    <div>
      <HeroSection banners={data.hero_banners} />
      <FeaturedCollections collections={data.collections} />
      {/* {bestSellerSection && <FeaturedProduct products={[bestSellerSection]} />} */}
      <VideoSection videos={data.video_banner} />


      {latestSection && <FeaturedProduct products={[latestSection]} />}
    </div>
  )
}

export default HomePage
