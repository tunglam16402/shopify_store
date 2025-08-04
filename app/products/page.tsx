import { ProductList } from '@/components/products'
import getProductsQuery from '@/graphql/get-all-product-query'
import { mappingDiscountPrice } from '@/lib/helper'
import { shopifyFetch } from '@/lib/shopify'
import { GetProductsQuery } from '@/types/shopify/graphql'

export default async function ProductsPage() {
  const data = await shopifyFetch<GetProductsQuery>({
    query: getProductsQuery,
  })
  const products = data.products?.nodes ?? []

  const productsWithDiscount = products.map(mappingDiscountPrice)

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>
      <ProductList products={productsWithDiscount} />
    </main>
  )
}
