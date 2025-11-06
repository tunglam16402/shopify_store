'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/common/Breadcrumb'
import { mappingVariantPrice } from '@/lib/helper'

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

  // ✅ tìm collection cha và con dựa theo handle trong menu flattened
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

  console.log('parent :>> ', parent);

  console.log('child :>> ', child);

  const items = [
    ...(parent
      ? [{ label: parent.title, href: parent.url.replace(process.env.NEXT_PUBLIC_SITE_URL || '', '') }]
      : []),
    ...(child
      ? [{ label: child.title, href: child.url.replace(process.env.NEXT_PUBLIC_SITE_URL || '', '') }]
      : []),
    { label: product.title },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumb items={items} />

      <h1 className="text-4xl font-bold mb-6">{product.title}</h1>
      <p className="text-gray-600">{product.collection.title}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          {product.images.map((url) => (
            <Image
              key={url}
              src={url}
              alt={product.altText || product.title}
              height={500}
              width={500}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded"
            />
          ))}
        </div>

        {/* Product info */}
        <div>
          <p className="mb-6">{product.description}</p>

          {productPrice && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Price</h2>
              <div className="border p-4 rounded shadow-sm">
                {productPrice.compareAtPrice &&
                productPrice.compareAtPrice > productPrice.basePrice ? (
                  <>
                    <p className="line-through text-gray-400 text-sm">
                      {productPrice.compareAtPrice} {productPrice.currency}
                    </p>
                    <p className="text-red-600 font-semibold text-lg">
                      {productPrice.basePrice}
                      <span className="text-xs ml-1">
                        (-{productPrice.discountPercent}%)
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="font-semibold text-lg">
                    {productPrice.basePrice} {productPrice.currency}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Color variants */}
          {product.colorVariants.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-6 mb-2">
                Color Variants
              </h2>
              <div className="flex gap-2">
                {product.colorVariants.map((v) => (
                  <Link key={v.handle} href={`/products/${v.handle}`}>
                    <Image
                      src={v.image || '/placeholder.png'}
                      alt=""
                      width={50}
                      height={50}
                      className="rounded border object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
