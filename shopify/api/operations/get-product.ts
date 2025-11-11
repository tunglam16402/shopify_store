import { mappingDiscountPrice, mappingVariantPrice, parseShopifyErrors } from '@/lib/helper'
import { shopifyFetch } from '../../fetcher'
import {
  GetProductDetailQuery,
  GetProductsQuery,
  GetRelatedProductsQuery,
} from '../../types/graphql'
import getProductsQuery from '../../utils/query/get-all-product-query'
import getProductDetailQuery from '../../utils/query/get-product-by-handle-query'
import getRelatedProductsQuery from '@/shopify/utils/query/get-product-related'

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<GetProductDetailQuery>({
    query: getProductDetailQuery,
    variables: { handle },
  })

  const product = data?.product
  if (!product) return null

  const variantNode = product.variants?.edges?.[0]?.node
  const variant = variantNode
    ? {
        id: variantNode.id,
        sku: variantNode.sku || '',
        ...mappingVariantPrice(variantNode),
      }
    : undefined

  const colorVariants =
    product.colorVariants?.references?.nodes
      ?.filter(
        (p): p is { handle: string; featuredImage?: { url: string } } =>
          !!p && 'handle' in p
      )
      .map((p) => ({
        handle: p.handle,
        image: p.featuredImage?.url || null,
      })) ?? []

  const productInfo = product.productInfo?.value ?? ''

  let selectedCollection = null

  if (product.collections?.nodes?.length) {
    selectedCollection = product.collections.nodes.reduce(
      (deepest, current) => {
        const currentDepth = current.handle.split('-').length
        const deepestDepth = deepest?.handle.split('-').length ?? 0
        return currentDepth > deepestDepth ? current : deepest
      }
    )
  }

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    collection: selectedCollection ?? product.collections.nodes[0],
    description: product.description,
    information: productInfo,
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

export async function getRelatedProduct(productId: string) {
  try {
    const data = await shopifyFetch<GetRelatedProductsQuery>({
      query: getRelatedProductsQuery,
      variables: { productId },
    })

    if (!data.productRecommendations) {
      return null
    }

    const errors = parseShopifyErrors(data.productRecommendations)
    if (errors.length > 0) {
      return { success: false, errors }
    }

    return {
      success: true,
      data: data.productRecommendations.map(mappingDiscountPrice),
    }
  } catch (error) {
    console.error('Error in getRelatedProduct:', error)
    return {
      success: false,
      errors: [{ field: [], message: 'Network error or Shopify unreachable' }],
    }
  }
}
