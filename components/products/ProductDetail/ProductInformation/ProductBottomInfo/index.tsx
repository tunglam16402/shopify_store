'use client'

import React from 'react'
import { ProductDetailProps } from '../..'
import StyledHeading from '@/components/ui/StyledHeading'
import AddToCart from '@/components/products/AddToCart'

interface IProductBottomInfo {
  product: ProductDetailProps['product']
  show?: boolean // controlled từ parent
}

const ProductBottomInfo: React.FC<IProductBottomInfo> = ({
  product,
  show = true,
}) => {
  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-20 flex flex-col md:flex-row items-center md:justify-between gap-2 p-4 md:px-8
        bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.2)]
        transition-all duration-500 ease-out
        ${
          show
            ? 'translate-y-0 opacity-100 '
            : 'translate-y-full opacity-0 '
        }
      `}
    >
      <div>
        <StyledHeading
          text={product.title}
          normalClass="capitalize text-xl md:text-3xl"
          tangerineClass="font-[tangerine] font-bold text-3xl md:text-4xl"
        />
      </div>
      <div className="w-full md:w-fit">
        <AddToCart
          variantId={product.variant?.id || ''}
          className="w-full md:w-fit md:px-24 md:text-lg"
        />
      </div>
    </div>
  )
}

export default ProductBottomInfo