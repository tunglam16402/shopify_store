// app/products/[handle]/page.tsx
import ProductDetail from '@/components/products/ProductDetail'
import {
  flattenMenuForCategories,
  getMainMenu,
} from '@/shopify/api/operations/get-menu'
import {
  getProductByHandle,
  getRelatedProduct,
} from '@/shopify/api/operations/get-product'
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

  const menuRaw = await getMainMenu()
  const menu = flattenMenuForCategories(menuRaw)

  const relatedProduct = await getRelatedProduct(product?.id)

  return (
    <main className="mx-auto mt-[100px] md:mt-0">
      <div>
        <Suspense fallback={<div>Loading images...</div>}>
          <ProductDetail
            product={product}
            menu={menu}
            relatedProducts={relatedProduct?.data || []}
          />
        </Suspense>
      </div>
    </main>
  )
}

export default ProductDetailPage
