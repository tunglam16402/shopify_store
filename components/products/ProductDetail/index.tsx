'use client'

import { CategoryMenu } from '@/components/collection/type'
import Breadcrumb from '@/components/common/Breadcrumb'
import WishlistButton from '@/components/common/WishlistButton'
import { trackViewedProduct } from '@/lib/analytics/klaviyo'
import { ProductCardProps } from '@/types/product/productCard'
import { useEffect } from 'react'
import ProductRecommend from '../ProductRecommend'
import ProductReview from '../ProductReview'
import ProductImage from './ProductImage'
import ProductInformation from './ProductInformation'
import TopCollection from './TopCollection'
import { PersonalizationConfig } from './type'

export type ProductDetailProps = {
  product: {
    id: string
    handle: string
    title: string
    collection: {
      id: string
      handle: string
      title: string
    }
    description: string
    vendor: string
    information: string
    featuredImage: string | null
    altText: string
    images: string[]
    variant:
      | {
          basePrice: number
          compareAtPrice: number
          discountPercent: number
          currency: string
          id: string
          sku: string
        }
      | undefined
    colorVariants: {
      handle: string
      image: string | null
    }[]
    personalization: PersonalizationConfig
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
      brand: product.vendor,
      price: String(product.variant?.basePrice),
      metadata: {
        brand: product.vendor,
        price: String(product.variant?.basePrice),
        compareAtPrice: String(product?.variant?.compareAtPrice),
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id])

  return (
    <div className="pt-8">
      <div className="page-width">
        <Breadcrumb items={items} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
        <div className="full-navigation-mobile relative">
          <ProductImage
            images={product.images}
            altText={product.altText}
            title={product.title}
          />
          <div className="absolute top-3 right-2 z-1 p-2 md:right-4">
            <WishlistButton
              iconClassName="size-8 md:size-10"
              productId={product.id}
            />
          </div>
        </div>

        <ProductInformation product={product} />
      </div>

      <div className="mt-12 md:mt-20">
        <ProductRecommend title="Related products" data={relatedProducts} />
      </div>
      {complementaryProducts.length > 0 && (
        <div className="mt-12 md:mt-20">
          <ProductRecommend
            title="Complementary products"
            data={complementaryProducts}
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
