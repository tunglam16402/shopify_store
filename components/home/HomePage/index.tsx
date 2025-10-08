/* eslint-disable @typescript-eslint/no-explicit-any */
import { HomepageDocumentData, Simplify } from '@/prismicio-types'
import HeroSection from '../HeroSection'
import ShowCase from '../ShowCase'

interface IHomePage {
  data: Simplify<HomepageDocumentData>
  banners: any[]
}

const HomePage: React.FC<IHomePage> = ({ data, banners }) => {
  return (
    <div>
      <HeroSection banners={banners} />
      <ShowCase />
    </div>
  )
}

export default HomePage
