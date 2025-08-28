import { ProductList } from '@/components/products'
import { getCollectionProductsByHandle } from '@/shopify/api/operations/get-collection'

type Props = {
  params: Promise<{ handle: string }>
}

const CollectionPage = async ({ params }: Props) => {
  const { handle } = await params

  const product = await getCollectionProductsByHandle(handle)

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <ProductList products={product} />
    </main>
  )
}

export default CollectionPage
