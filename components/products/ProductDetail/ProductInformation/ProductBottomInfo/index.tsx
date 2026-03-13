'use client'

import React from 'react'
import { ProductDetailProps } from '../..'
import StyledHeading from '@/components/ui/StyledHeading'
import AddToCart from '@/components/products/AddToCart'

interface IProductBottomInfo {
  product: ProductDetailProps['product']
  show?: boolean
}

const ProductBottomInfo: React.FC<IProductBottomInfo> = ({
  product,
  show = true,
}) => {
  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-20 flex flex-col items-center gap-2 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out md:flex-row md:justify-between md:px-8 ${show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} `}
    >
      <div>
        <StyledHeading
          text={product.title}
          headingClass="capitalize text-xl md:text-3xl"
          subHeadingClass="font-sub-heading font-bold text-2xl md:text-3xl"
        />
      </div>
      <div className="w-full md:w-fit">
        <AddToCart
          variantId={product.variant?.id || ''}
          className="bg-primary w-full text-white hover:bg-white! hover:text-black! md:w-fit md:px-24 md:text-lg"
          cartBtnPrice={product?.variant?.basePrice}
        />
      </div>
    </div>
  )
}

export default ProductBottomInfo
