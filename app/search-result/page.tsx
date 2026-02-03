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
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Shop All Products</h1>
      <ProductList products={products} />
    </main>
  )
}
