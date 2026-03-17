import Footer from '@/components/layout/Footer'
import MainHeader from '@/components/layout/MainHeader'
import SubHeader from '@/components/layout/SubHeader'
import TopHeader from '@/components/layout/TopHeader'
import Newsletter from '@/components/Newsletter'
import { createClient } from '@/prismicio'
import { getMainMenu } from '@/shopify/api/operations/get-menu'
import { cacheLife } from 'next/cache'
import { Suspense } from 'react'

const MainLayout = async ({
  children,
  cookie,
}: {
  children: React.ReactNode
  cookie?: string
}) => {
  'use cache'
  cacheLife('days')

  const client = createClient({}, cookie)
  const [footer, newsletter, menuItems] = await Promise.all([
    client.getSingle('footer'),
    client.getSingle('newsletter').catch(() => null),
    getMainMenu(),
  ])

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

      {newsletter?.data ? (
        <Suspense fallback={null}>
          <Newsletter data={newsletter.data} />
        </Suspense>
      ) : null}
    </>
  )
}

export default MainLayout
