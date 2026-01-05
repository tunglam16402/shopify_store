import Footer from '@/components/layout/Footer'
import MainHeader from '@/components/layout/MainHeader'
import SubHeader from '@/components/layout/SubHeader'
import TopHeader from '@/components/layout/TopHeader'
import { createClient } from '@/prismicio'
import { getMainMenu } from '@/shopify/api/operations/get-menu'
import { cacheLife } from 'next/cache'
import { Suspense } from 'react'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  'use cache'
  cacheLife('days')

  const client = createClient()
  const footer = await client.getSingle('footer')

  const menuItems = await getMainMenu()

  return (
    <>
      <Suspense fallback={null}>
        <header>
          <TopHeader />
          <MainHeader menuItems={menuItems} />
          <SubHeader menuItems={menuItems} />
        </header>
      </Suspense>

      <main className="relative">{children}</main>

      <Suspense fallback={null}>
        <Footer data={footer.data} />
      </Suspense>
    </>
  )
}

export default MainLayout
