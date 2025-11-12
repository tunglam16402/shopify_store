'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { IcoStarFill } from '@/components/icons'
import { QuantityInput } from '@/components/ui/QuantityInput'

import StyledHeading from '@/components/ui/StyledHeading'
import { ProductDetailProps } from '..'
import ProductUSP from '../ProductUSP'
import ProductInfo from '../ProductInfo'
import AddToCart from '../../AddToCart'

type ProductInformationProps = {
  product: ProductDetailProps['product']
}

const MAX_QUANTITY = 99

const ProductInformation = ({ product }: ProductInformationProps) => {
  const productPrice = product.variant
  const [quantity, setQuantity] = useState(1)

  const handleChangeQuantity = (newQty: number) => {
    setQuantity(newQty)
  }

  return (
    <div className="main-width">
      {/* Collection title + Product title */}
      <p className="text-gray-600 uppercase text-sm mb-1">
        {product.collection.title}
      </p>

      <StyledHeading
        text={product.title}
        normalClass="uppercase text-4xl"
        tangerineClass="font-[tangerine] font-bold text-5xl"
      />

      {/* Ratings */}
      <div className="flex items-center gap-2 mt-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <IcoStarFill key={i} className="h-4 w-4 " />
          ))}
        </div>
        <div>1 reviews</div>
      </div>

      {/* Price */}
      <div className="mt-4">
        {productPrice?.compareAtPrice &&
        productPrice.compareAtPrice > productPrice.basePrice ? (
          <div className="flex items-center">
            <div className="text-red-400 line-through text-2xl ">
              {productPrice.compareAtPrice} {productPrice.currency}
            </div>

            <div className="mx-3 flex h-7 items-center rounded-3xl border border-sub-primary px-3 text-base text-sub-primary">
              {productPrice.discountPercent}% Off
            </div>

            <div className="text-3xl font-semibold">
              {productPrice.basePrice} {productPrice.currency}
            </div>
          </div>
        ) : (
          <p className="font-semibold text-3xl">
            {productPrice?.basePrice} {productPrice?.currency}
          </p>
        )}
      </div>

      {/* Color variants */}
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

      {/* Quantity + AddToCart */}
      <div className="flex items-center gap-3 mt-8 md:gap-8">
        <QuantityInput
          value={quantity}
          min={1}
          max={MAX_QUANTITY}
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

      {/* USP */}
      <div className="mt-8">
        <ProductUSP />
      </div>

      {/* Product Info */}
      <div className="mt-8">
        <ProductInfo
          description={product.description}
          information={product.information}
        />
      </div>
    </div>
  )
}

export default ProductInformation
