import React from 'react'
import ProductSwiper from '../ProductSwipper'
import { ProductCardProps } from '@/types/product/productCard'

interface IProductRelated {
  relatedProduct: ProductCardProps[]
}

const ProductRelated: React.FC<IProductRelated> = ({ relatedProduct }) => {
  return (
    <div>
      <ProductSwiper data={relatedProduct} />
    </div>
  )
}

export default ProductRelated
