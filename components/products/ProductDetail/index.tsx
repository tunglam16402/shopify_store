import Breadcrumb from '@/components/common/Breadcrumb'
import { mappingVariantPrice } from '@/lib/helper'
import Image from 'next/image'
import Link from 'next/link'

type Variant = ReturnType<typeof mappingVariantPrice> & {
  id: string
  sku: string
}

type ProductDetailProps = {
  product: {
    id: string
    handle: string
    title: string
    description: string
    collection: {id: string, title: string, handle: string}
    featuredImage?: string | null
    altText?: string
    images: string[]
    variant?: Variant
    colorVariants: { handle: string; image: string | null }[]
  }
}



const ProductDetail = ({ product }: ProductDetailProps) => {

const items = [
  { label: product.collection.title, href: `/collections/${product.collection.handle}` },
  { label: product.title }
];

  const productPrice = product.variant
  return (
    <div>
      <Breadcrumb items={items} />
      <h1 className="text-4xl font-bold mb-6">{product.title}</h1>
      <p>{product.collection.title}</p>

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

          {/* Variant info */}
          {productPrice && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Price</h2>
              <div className="border p-4 rounded shadow-sm">
                {productPrice.compareAtPrice &&
                productPrice.compareAtPrice > productPrice.basePrice ? (
                  <div>
                    <p className="line-through text-gray-400 text-sm">
                      {productPrice.compareAtPrice}
                    </p>
                    <p className="line-through text-gray-400 text-sm">
                      {productPrice.currency}
                    </p>

                    <p className="text-red-600 font-semibold text-lg">
                      {productPrice.basePrice}
                      <span className="text-xs">
                        (-{productPrice.discountPercent}%)
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="font-semibold text-lg">
                    {productPrice.basePrice}
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
