import TopHeader from './TopHeader'
import MainHeader from './MainHeader'
import SubHeader from './SubHeader'
import { getCollections } from '@/shopify/api/operations/get-collection'
import { getMainMenu } from '@/shopify/api/operations/get-menu'

export default async function Header() {
  const menuItems = await getMainMenu()
  const collections = await getCollections()

  return (
    <header>
      <TopHeader />
      <MainHeader menuItems={menuItems} />
      <SubHeader collections={collections} />
    </header>
  )
}
