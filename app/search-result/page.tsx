import { ProductList } from '@/components/products'
import { getSearchResult } from '@/shopify/api/operations/get-search'

interface SearchResultPageProps {
  searchParams?: Promise<{ q?: string }>
}

export default async function SearchResultPage({
  searchParams,
}: SearchResultPageProps) {
  const query = (await searchParams)?.q || ''

  const products = await getSearchResult(query)

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>
      <ProductList products={products} />
    </main>
  )
}
