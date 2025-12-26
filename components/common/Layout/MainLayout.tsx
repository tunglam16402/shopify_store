import Footer from '@/components/layout/Footer'
import MainHeader from '@/components/layout/MainHeader'
import SubHeader from '@/components/layout/SubHeader'
import TopHeader from '@/components/layout/TopHeader'
import { createClient } from '@/prismicio'
import { getMainMenu } from '@/shopify/api/operations/get-menu'
import { cacheLife } from 'next/cache'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  'use cache'
  cacheLife('hours')
  
  const client = createClient()
  const footer = await client.getSingle('footer')

  const menuItems = await getMainMenu()

  const header = (
    <header>
      <TopHeader />
      <MainHeader menuItems={menuItems} />
      <SubHeader menuItems={menuItems} />
    </header>
  )

  return (
    <>
      {header}
      <main className="relative">{children}</main>
      <Footer data={footer.data} />
    </>
  )
}

export default MainLayout
