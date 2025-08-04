import { ProductList } from '@/components/products'
import getCollectionByHandleQuery from '@/graphql/get-product-by-collection-query'
import { mappingDiscountPrice } from '@/lib/helper'
import { shopifyFetch } from '@/lib/shopify'
import { GetCollectionListQuery } from '@/types/shopify/graphql'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ handle: string }>
}

const CollectionPage = async ({ params }: Props) => {
  const { handle } = await params

  const data = await shopifyFetch<GetCollectionListQuery>({
    query: getCollectionByHandleQuery,
    variables: { handle },
  })

  const collection = data?.collection?.products?.nodes || []
  const productsWithDiscount = collection.map(mappingDiscountPrice)

  if (!collection) return notFound()

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <ProductList products={productsWithDiscount} />
    </main>
  )
}

export default CollectionPage
