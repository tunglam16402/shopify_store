import { ProductList } from '@/components/products'
import { getSearchResult } from '@/shopify/api/operations/get-search'

export default async function SearchResultPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const param = searchParams.q ?? ''

  const products = await getSearchResult(param)

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>
      <ProductList products={products} />
    </main>
  )
}
