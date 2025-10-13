import { ProductList } from '@/components/products'
import { getAllProduct } from '@/shopify/api/operations/get-product'

export default async function ProductsPage() {
  const products = await getAllProduct()

  return (
    <main className="main-width">
      <h1 className="text-3xl font-bold">Shop All Products</h1>
      <ProductList products={products} />
    </main>
  )
}
