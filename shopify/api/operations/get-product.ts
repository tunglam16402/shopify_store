import { mappingDiscountPrice, mappingVariantPrice } from '@/lib/helper'
import { shopifyFetch } from '../../fetcher'
import { GetProductDetailQuery, GetProductsQuery } from '../../types/graphql'
import getProductsQuery from '../../utils/query/get-all-product-query'
import getProductDetailQuery from '../../utils/query/get-product-by-handle-query'

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<GetProductDetailQuery>({
    query: getProductDetailQuery,
    variables: { handle },
  })

  const product = data?.product
  if (!product) return null

  // Lấy variant đầu tiên và map giá bằng helper
  const variantNode = product.variants?.edges?.[0]?.node
  const variant = variantNode
    ? {
        id: variantNode.id,
        sku: variantNode.sku || '',
        ...mappingVariantPrice(variantNode),
      }
    : undefined

  // Map color variants
  const colorVariants =
    product.colorVariants?.references?.nodes
      ?.filter((p): p is { handle: string; featuredImage?: { url: string } } => !!p && 'handle' in p)
      .map((p) => ({ handle: p.handle, image: p.featuredImage?.url || null })) ?? []

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    featuredImage: product.featuredImage?.url || null,
    altText: product.featuredImage?.altText || '',
    images: product.images?.nodes?.map((img) => img.url) || [],
    variant,
    colorVariants,
  }
}

export async function getAllProduct() {
  const data = await shopifyFetch<GetProductsQuery>({
    query: getProductsQuery,
  })

  const products = data.products?.nodes ?? []

  return products.map(mappingDiscountPrice)
}
