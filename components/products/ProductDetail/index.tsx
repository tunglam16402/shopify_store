'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import { BorderHeart, IcoStarFill } from '@/components/icons'
import { mappingVariantPrice } from '@/lib/helper'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AddToCart from '../AddToCart'
import ProductImage from './ProductImage'
import { QuantityInput } from '@/components/ui/QuantityInput'
import ProductUSP from './ProductUSP'
import { trackViewedProduct } from '@/lib/analytics/klaviyo'
import ProductInfo from './ProductInfo'

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

type ProductDetailProps = {
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
  menu: MenuCategory[]
}

const ProductDetail = ({ product, menu }: ProductDetailProps) => {
  const productPrice = product.variant
  const findCollectionTrail = () => {
    for (const category of menu) {
      const found = category.collections.find((col) =>
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
    const item = {
      id: product.id,
      handle: product.handle,
      imageURL: product?.featuredImage || '',
      title: product.title,
      price: product.variant?.basePrice,
      compareAtPrice: product?.variant?.compareAtPrice,
    }
    trackViewedProduct(item)
  }, [product.id])

  const [quantity, setQuantity] = useState(1)
  const maxQuantity = 99

  const handleChangeQuantity = (newQty: number) => {
    setQuantity(newQty)
  }

  return (
    <div className="py-8">
      <div className="main-width">
        <Breadcrumb items={items} />
      </div>

      <div className="grid grid-cols-1 mt-6 md:grid-cols-2 gap-10 md:gap-14">
        <div className=" relative">
          <ProductImage
            images={product.images}
            altText={product.altText}
            title={product.title}
          />
          <div className="absolute top-3 right-2 md:right-4 p-2">
            <BorderHeart className="size-8  md:size-10" />
          </div>
        </div>

        <div className="main-width">
          <div>
            <p className="text-gray-600 uppercase text-sm">
              {product.collection.title}
            </p>
            <h1 className="text-4xl mt-1">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                <IcoStarFill className="h-4 w-4 " />
                <IcoStarFill className="h-4 w-4 " />
                <IcoStarFill className="h-4 w-4 " />
                <IcoStarFill className="h-4 w-4 " />
                <IcoStarFill className="h-4 w-4 " />
              </div>
              <div>1 reviews</div>
            </div>
          </div>

          <div className="mt-4">
            {productPrice?.compareAtPrice &&
            productPrice.compareAtPrice > productPrice.basePrice ? (
              <div className="flex items-center">
                <div className="text-red-400 line-through text-2xl ">
                  {productPrice.compareAtPrice} {productPrice?.currency}
                </div>

                <div className="mx-3 flex h-7 items-center rounded-3xl border border-sub-primary px-3 text-base text-sub-primary">
                  {productPrice.discountPercent}% Off
                </div>

                <div className="text-3xl font-semibold">
                  {productPrice.basePrice} {productPrice?.currency}
                </div>
              </div>
            ) : (
              <p className="font-semibold text-3xl">
                {productPrice?.basePrice} {productPrice?.currency}
              </p>
            )}
          </div>

          {product.colorVariants.length > 0 && (
            <div className="flex gap-2 mt-10">
              {product.colorVariants.map((v) => (
                <Link key={v.handle} href={`/products/${v.handle}`}>
                  <Image
                    src={v.image || '/placeholder.png'}
                    alt=""
                    width={64}
                    height={64}
                    className="rounded border object-cover"
                    sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 10vw"
                  />
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 mt-8 md:gap-8">
            <QuantityInput
              value={quantity}
              min={1}
              max={maxQuantity}
              onChange={handleChangeQuantity}
            />
            <div className="w-full">
              <AddToCart
                variantId={product.variant?.id || ''}
                quantity={quantity}
                className="w-full py-6 text-base md:text-lg"
              />
            </div>
          </div>
          <div className="mt-8 ">
            <ProductUSP />
          </div>

          <div>
            <ProductInfo description={product.description} information={product.information}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
