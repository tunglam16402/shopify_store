import CollectionPage from '@/components/collection/CollectionPage'
import { getBannerData } from '@/components/collection/CollectionPage/helper'
import { getCollectionProductsByHandle } from '@/shopify/api/operations/get-collection'
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
  const bannerData = await getBannerData(`/collections/${handle}`)

  return (
    <main className="mt-[100px] md:mt-0">
      <Suspense fallback={null}>
        <CollectionPage products={products} bannerData={bannerData} />
      </Suspense>
    </main>
  )
}

export default Collection
