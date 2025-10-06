import { HomepageDocumentData, Simplify } from '@/prismicio-types'
import HeroSection from '../HeroSection'
import ShowCase from '../ShowCase'

interface IHomePage {
  data: Simplify<HomepageDocumentData>
}

const HomePage: React.FC<IHomePage> = ({ data }) => {
  return (
    <div>
      <HeroSection banners={data.hero_banners} />
      <ShowCase />
    </div>
  )
}

export default HomePage
