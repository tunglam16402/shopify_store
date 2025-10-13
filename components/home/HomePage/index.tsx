import { HomepageDocumentData, Simplify } from '@/prismicio-types'
import HeroSection from '../HeroSection'
import FeaturedCollections from '../FeaturedCollection'

interface IHomePage {
  data: Simplify<HomepageDocumentData>
}

const HomePage: React.FC<IHomePage> = ({ data}) => {
  return (
    <div>
      <HeroSection banners={data.hero_banners} />
      <FeaturedCollections collections={data.collections}/>
    </div>
  )
}

export default HomePage
