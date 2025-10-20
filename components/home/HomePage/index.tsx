import { HomepageDocumentData, Simplify } from '@/prismicio-types'
import HeroSection from '../HeroSection'
import FeaturedCollections from '../FeaturedCollection'
import FeaturedProduct from '../FeaturedProduct'
import VideoSection from '../VideoSection'
import FeaturedIn from '../FeaturedIn'
import Blogs from '../Blogs'
import USPs from '../USPs'

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

      {latestSection && <FeaturedProduct products={[latestSection]} />}
      <VideoSection videos={data.video_banner} />
      <HeroSection banners={data.hero_banners} />
      <section className='max-w-[1440px] mx-auto'>
        {latestSection && <FeaturedProduct products={[latestSection]} />}
      </section>
      {/* <FeaturedIn features/> */}
      <USPs usps={data.usp}/>
      <Blogs blogs={data.blog}/>


      {/* {bestSellerSection && <FeaturedProduct products={[bestSellerSection]} />} */}
    </div>
  )
}

export default HomePage
