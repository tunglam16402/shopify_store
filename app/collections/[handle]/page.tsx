import CollectionPage from '@/components/collection/CollectionPage'
import { getBannerData } from '@/components/collection/CollectionPage/helper'
import { getCollectionProductsByHandle } from '@/shopify/api/operations/get-collection'

type Props = {
  params: Promise<{ handle: string }>
}

const Collection = async ({ params }: Props) => {
  const { handle } = await params

  const products = await getCollectionProductsByHandle(handle)
  const bannerData = await getBannerData(`/collections/${handle}`)

  console.log('bannerData :>> ', bannerData);

  return (
    <main>
      <CollectionPage products={products} bannerData={bannerData} />
    </main>
  )
}

export default Collection
