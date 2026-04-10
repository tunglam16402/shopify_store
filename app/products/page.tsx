import { ShopByCategory } from '@/components/collection'
import ProductInfiniteList from '@/components/products/ProductInfiniteList'
import { getMainMenu } from '@/shopify/api/operations/get-menu'
import { getProducts } from '@/shopify/api/operations/get-product'
import { cacheLife } from 'next/cache'

export default async function ProductsPage() {
  'use cache'
  cacheLife('hours')

  const category = await getMainMenu()
  const initialData = await getProducts({ first: 40 })

  return (
    <main className="page-width mobile-mt">
      <h1 className="text-3xl md:text-5xl font-bold">Shop All Products</h1>
      <div className="mt-6 md:mt-10">
        <ShopByCategory subCategories={category} />
      </div>
      <div className="mt-4 md:mt-8">
        <ProductInfiniteList initialData={initialData} />
      </div>
    </main>
  )
}
