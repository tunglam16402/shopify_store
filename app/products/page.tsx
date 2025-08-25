import { ProductList } from '@/components/products'
import { getAllProduct } from '@/shopify/operations/get-product'

export default async function ProductsPage() {
  const products = await getAllProduct()

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>
      <ProductList products={products} />
    </main>
  )
}
