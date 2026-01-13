'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import { BorderHeart } from '@/components/icons'
import { trackViewedProduct } from '@/lib/analytics/klaviyo'
import { mappingVariantPrice } from '@/lib/helper'
import { ProductCardProps } from '@/types/product/productCard'
import { useEffect } from 'react'
import ProductRecommend from '../ProductRecommend'
import ProductImage from './ProductImage'
import ProductInformation from './ProductInformation'
import TopCollection from './TopCollection'
import ProductReview from '../ProductReview'
import { CategoryMenu } from '@/components/collection/type'

type Variant = ReturnType<typeof mappingVariantPrice> & {
  id: string
  sku: string
}

type MenuCollection = {
  title: string
  url: string
  image?: string
}

type MenuCategory = {
  title: string
  url: string
  collections: MenuCollection[]
}

export type ProductDetailProps = {
  product: {
    id: string
    handle: string
    title: string
    description: string
    information: string
    collection: { id: string; title: string; handle: string }
    featuredImage?: string | null
    altText?: string
    images: string[]
    variant?: Variant
    colorVariants: { handle: string; image: string | null }[]
  }
  menu: CategoryMenu[]
  relatedProducts: ProductCardProps[]
  complementaryProducts: ProductCardProps[]
}

const ProductDetail = ({
  product,
  menu,
  relatedProducts,
  complementaryProducts,
}: ProductDetailProps) => {
  const findCollectionTrail = () => {
    for (const category of menu) {
      const found = category?.collections?.find((col) =>
        col.url.includes(product.collection.handle)
      )
      if (found) {
        return [category, found]
      }
    }
    return []
  }

  const [parent, child] = findCollectionTrail()

  const items = [
    ...(parent ? [{ label: parent.title, href: parent.url }] : []),
    ...(child ? [{ label: child.title, href: child.url }] : []),
    { label: product.title },
  ]

  useEffect(() => {
    trackViewedProduct({
      name: product.title,
      productID: product.id,
      imageURL: product?.featuredImage || '',
      handle: product.handle,
      // brand: vendor,
      price: String(product.variant?.basePrice),
      metadata: {
        // brand: vendor,
        price: String(product.variant?.basePrice),
        compareAtPrice: String(product?.variant?.compareAtPrice),
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id])

  return (
    <div className="pt-8">
      <div className="main-width">
        <Breadcrumb items={items} />
      </div>

      <div className="grid grid-cols-1 mt-6 md:grid-cols-2 gap-10 md:gap-14">
        <div className=" relative full-navigation-mobile">
          <ProductImage
            images={product.images}
            altText={product.altText}
            title={product.title}
          />
          <div className="absolute top-3 right-2 md:right-4 p-2 z-1">
            <BorderHeart className="size-8  md:size-10" />
          </div>
        </div>

        <ProductInformation product={product} />
      </div>

      <div className="mt-12 md:mt-20">
        <ProductRecommend type="related" relatedProduct={relatedProducts} />
      </div>
      {complementaryProducts.length > 0 && (
        <div className="mt-12 md:mt-20">
          <ProductRecommend
            type="complementary"
            complementaryProduct={complementaryProducts}
          />
        </div>
      )}

      <div className="mt-12 md:mt-20">
        <TopCollection />
      </div>

      <div className="mt-20 md:mt-30">
        <ProductReview productId={product.id} />
      </div>
    </div>
  )
}

export default ProductDetail
