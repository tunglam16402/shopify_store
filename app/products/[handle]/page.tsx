// app/products/[handle]/page.tsx
import ProductDetail from '@/components/products/ProductDetail'
import { getProductByHandle } from '@/shopify/operations/get-product'

interface Props {
  params: Promise<{ handle: string }>
}

const ProductDetailPage = async ({ params }: Props) => {
  const { handle } = await params

  const product = await getProductByHandle(handle)

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
