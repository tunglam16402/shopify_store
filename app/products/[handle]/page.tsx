// app/products/[handle]/page.tsx
import ProductDetail from '@/components/products/ProductDetail'
import { flattenMenuForCategories, getMainMenu } from '@/shopify/api/operations/get-menu'
import { getProductByHandle } from '@/shopify/api/operations/get-product'
import { Suspense } from 'react'

export const experimental_ppr = true
interface Props {
  params: Promise<{ handle: string }>
}

const ProductDetailPage = async ({ params }: Props) => {
  const { handle } = await params

  const product = await getProductByHandle(handle)
  const menuRaw = await getMainMenu()
  const menu = flattenMenuForCategories(menuRaw)

  if (!product) {
    return <div>Product not found.</div>
  }

  return (
    <main className="mx-auto mt-[105px]">
      <div>
        <Suspense fallback={<div>Loading images...</div>}>
          <ProductDetail product={product} menu={menu} />
        </Suspense>
      </div>
    </main>
  )
}

export default ProductDetailPage
