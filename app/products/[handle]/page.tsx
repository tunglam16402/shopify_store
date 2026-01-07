import ProductDetail from '@/components/products/ProductDetail'
import {
  flattenMenuForCategories,
  getMainMenu,
} from '@/shopify/api/operations/get-menu'
import {
  getProductByHandle,
  getProductRecommendations,
} from '@/shopify/api/operations/get-product'
import { cacheLife } from 'next/cache'
import { Suspense } from 'react'

interface Props {
  params: Promise<{ handle: string }>
}

const ProductDetailPage = async ({ params }: Props) => {
  'use cache'
  cacheLife('hours')
  
  const { handle } = await params

  const product = await getProductByHandle(handle)

  if (!product) {
    return <div>Product not found.</div>
  }
  const [menuRaw, recommendations] = await Promise.all([
    getMainMenu(),
    getProductRecommendations(product.id),
  ])

  const menu = flattenMenuForCategories(menuRaw)

  return (
    <main className="mx-auto mt-[100px] md:mt-0">
      <div>
        <Suspense fallback={<div>Loading images...</div>}>
          <ProductDetail
            product={product}
            menu={menu}
            relatedProducts={recommendations?.data?.related ?? []}
            complementaryProducts={recommendations?.data?.complementary ?? []}
          />
        </Suspense>
      </div>
    </main>
  )
}

export default ProductDetailPage
