import { mappingVariantPrice } from '@/lib/helper'
import { GetProductDetailQuery } from '@/shopify/types/graphql'
import Image from 'next/image'
import React from 'react'

type ProductDetailProps = {
  product: NonNullable<GetProductDetailQuery['product']>
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">{product.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.images.nodes.map((node, i) => (
            <Image
              key={i}
              src={node.url}
              alt={node.altText || product.title}
              width={600}
              height={600}
              className="object-cover rounded"
            />
          ))}
        </div>

        <div>
          <p className="mb-6">{product.description}</p>

          <h2 className="text-2xl font-semibold mb-4">Variants & Prices</h2>
          <ul>
            {product.variants.edges.map(({ node }) => {
              const { basePrice, compareAtPrice, discountPercent } =
                mappingVariantPrice(node)

              const color =
                node.selectedOptions.find(
                  (o) => o.name.toLowerCase() === 'color'
                )?.value ?? 'Default'

              return (
                <li key={node.id} className="border p-4 rounded shadow-sm">
                  <p>SKU: {node.sku || 'N/A'}</p>
                  <p>Color: {color}</p>

                  {compareAtPrice > basePrice ? (
                    <div>
                      <p className="line-through text-gray-400 text-sm">
                        {compareAtPrice}
                      </p>
                      <p className="text-red-600 font-semibold text-lg">
                        {basePrice}{' '}
                        <span className="text-xs">(-{discountPercent}%)</span>
                      </p>
                    </div>
                  ) : (
                    <p className="font-semibold text-lg">{basePrice}</p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
