import { ProductList } from '@/components/products'
import { getAllProduct } from '@/shopify/api/operations/get-product'
import { cacheLife } from 'next/cache'

export default async function ProductsPage() {
  'use cache'
  cacheLife('hours')

  const products = await getAllProduct()

  return (
    <main className="main-width">
      <h1 className="text-3xl font-bold">Shop All Products</h1>
      <ProductList products={products} />
    </main>
  )
}
