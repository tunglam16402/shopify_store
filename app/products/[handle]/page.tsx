// app/products/[handle]/page.tsx
import ProductDetail from '@/components/products/ProductDetail'
import getProductDetailQuery from '@/graphql/get-product-by-handle-query'
import { shopifyFetch } from '@/lib/shopify'
import { GetProductDetailQuery } from '@/types/shopify/graphql'

interface Props {
  params: Promise<{ handle: string }>
}

const ProductDetailPage = async ({ params }: Props) => {
  const { handle } = await params
  const data = await shopifyFetch<GetProductDetailQuery>({
    query: getProductDetailQuery,
    variables: { handle },
  })
  const product = data.product

  if (!product) {
    return <div>Product not found.</div>
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div>
        <ProductDetail product={product} />
      </div>
    </main>
  )
}

export default ProductDetailPage
