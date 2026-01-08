import CollectionPage from '@/components/collection/CollectionPage'
import {
  getBannerData,
  getBreadcrumbFromMenu,
} from '@/components/collection/CollectionPage/helper'
import {
  getCollectionProductsByHandle,
  getCollections,
} from '@/shopify/api/operations/get-collection'
import { getMainMenu } from '@/shopify/api/operations/get-menu'
import { cacheLife } from 'next/cache'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ handle: string }>
}

const Collection = async ({ params }: Props) => {
  'use cache'
  cacheLife('hours')

  const { handle } = await params

  const products = await getCollectionProductsByHandle(handle)
  const collections = await getCollections()
  const bannerData = await getBannerData(`/collections/${handle}`)

  console.log('collections :>> ', collections);

  return (
    <main className="mt-[100px] md:mt-0">
      <Suspense fallback={null}>
        <CollectionPage
          products={products}
          bannerData={bannerData}
          handle={handle}
          collections={collections}
        />
      </Suspense>
    </main>
  )
}

export default Collection
