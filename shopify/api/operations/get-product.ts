import {
  mappingDiscountPrice,
  mappingVariantPrice,
  parseShopifyErrors,
} from '@/lib/helper'
import { isPublicShopifyProduct } from '@/shopify/helper'
import getProductsByIdsQuery from '@/shopify/utils/query/get-product-by-ids'
import getProductRecommendationsQuery from '@/shopify/utils/query/get-product-recommendation'
import { ProductCardProps } from '@/types/product/productCard'
import { shopifyFetch } from '../../fetcher'
import {
  GetProductDetailQuery,
  GetProductRecommendationsQuery,
  GetProductsByIdsQuery,
  GetProductsQuery,
} from '../../types/graphql'
import getProductsQuery from '../../utils/query/get-all-product-query'
import getProductDetailQuery from '../../utils/query/get-product-by-handle-query'

function parsePersonalizationConfig(value?: string) {
  if (!value) return null

  try {
    const parsed = JSON.parse(value)
    if (parsed?.enabled !== true) return null
    return parsed
  } catch {
    return null
  }
}

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

  const personalization = parsePersonalizationConfig(
    product.personalization?.value
  )

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
    description: product.descriptionHtml,
    vendor: product.vendor,
    information: productInfo,
    featuredImage: product.featuredImage?.url || null,
    altText: product.featuredImage?.altText || '',
    images: product.images?.nodes?.map((img) => img.url) || [],
    variant,
    colorVariants,
    personalization,
  }
}

export async function getProductsByIds(
  ids: string[]
): Promise<ProductCardProps[]> {
  const data = await shopifyFetch<GetProductsByIdsQuery>({
    query: getProductsByIdsQuery,
    variables: { ids },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((data?.nodes as any[]) || [])
    .filter((item) => !!item)
    .map((item) => mappingDiscountPrice(item))
}

export async function getAllProduct() {
  const data = await shopifyFetch<GetProductsQuery>({
    query: getProductsQuery,
  })

  const products = (data.products?.nodes ?? []).filter(isPublicShopifyProduct)

  return products.map(mappingDiscountPrice)
}

export async function getProductRecommendations(productId: string) {
  try {
    const data = await shopifyFetch<{
      relatedProducts: GetProductRecommendationsQuery['relatedProducts']
      complementaryProducts: GetProductRecommendationsQuery['complementaryProducts']
    }>({
      query: getProductRecommendationsQuery,
      variables: { productId },
    })

    const relatedErrors = parseShopifyErrors(data.relatedProducts)
    const complementaryErrors = parseShopifyErrors(data.complementaryProducts)

    const errors = [...relatedErrors, ...complementaryErrors]
    if (errors.length > 0) {
      return { success: false, errors }
    }

    const related =
      data.relatedProducts
        ?.filter(isPublicShopifyProduct)
        .map(mappingDiscountPrice) ?? []

    const complementaryRaw =
      data.complementaryProducts
        ?.filter(isPublicShopifyProduct)
        .map(mappingDiscountPrice) ?? []

    const complementary =
      complementaryRaw.length > 0 ? complementaryRaw : [...related].reverse()

    return {
      success: true,
      data: {
        related,
        complementary,
        isFallback: complementaryRaw.length === 0,
      },
    }
  } catch (error) {
    console.error('Error in getProductRecommendations:', error)
    return {
      success: false,
      errors: [{ field: [], message: 'Network error or Shopify unreachable' }],
    }
  }
}
