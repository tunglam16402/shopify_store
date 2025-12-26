import CollectionPage from '@/components/collection/CollectionPage'
import { getBannerData } from '@/components/collection/CollectionPage/helper'
import { getCollectionProductsByHandle } from '@/shopify/api/operations/get-collection'
import { cacheLife } from 'next/cache'

type Props = {
  params: Promise<{ handle: string }>
}

const Collection = async ({ params }: Props) => {
  'use cache'
  cacheLife('hours')
  
  const { handle } = await params

  const products = await getCollectionProductsByHandle(handle)
  const bannerData = await getBannerData(`/collections/${handle}`)

  console.log('bannerData :>> ', bannerData)

  return (
    <main className="mt-[100px] md:mt-0">
      <CollectionPage products={products} bannerData={bannerData} />
    </main>
  )
}

export default Collection
