import React from 'react'
import ProductSwiper from '../ProductSwiper'
import { ProductCardProps } from '@/types/product/productCard'
import StyledHeading from '@/components/ui/StyledHeading'

interface IProductRecommend {
  relatedProduct?: ProductCardProps[]
  complementaryProduct?: ProductCardProps[]
  type: 'related' | 'complementary'
}

const ProductRecommend: React.FC<IProductRecommend> = ({
  relatedProduct,
  complementaryProduct,
  type,
}) => {
  const data = type === 'related' ? relatedProduct : complementaryProduct
  if (!data?.length) return null
  return (
    <>
      <div className='text-center'>
        <StyledHeading
          text={
            type === 'related' ? 'Related products' : 'Complementary products'
          }
          normalClass="uppercase text-3xl md:text-4xl"
          tangerineClass="font-[tangerine] font-bold text-5xl"
        />
      </div>
      <ProductSwiper data={data} className="mt-4" />
    </>
  )
}

export default ProductRecommend
