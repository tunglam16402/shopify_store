// app/products/[handle]/page.tsx
import ProductDetail from '@/components/products/ProductDetail'
import { getProductByHandle } from '@/shopify/api/operations/get-product'
import { Suspense } from 'react'

export const experimental_ppr = true
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
        <Suspense fallback={<div>Loading images...</div>}>
          <ProductDetail product={product} />
        </Suspense>
      </div>
    </main>
  )
}

export default ProductDetailPage
