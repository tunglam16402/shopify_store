import PWSwiper from '@/components/ui/Swiper'
import { ProductCardProps } from '@/types/product/productCard'
import React, { Suspense } from 'react'
import ProductCard from '../ProductCard'

export interface SwiperBreakpoint {
  slidesPerView: number
  slidesPerGroup?: number
  spaceBetween?: number
}

export const PRODUCT_SWIPER_BREAKPOINT = {
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 8,
  },
  640: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 8,
  },
  1024: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 24,
  },
}

type ProductSwiperProps = {
  data: ProductCardProps[]
  breakpoints?: Record<number, SwiperBreakpoint>
  className?: string
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({
  data,
  className = '',
  breakpoints,
}) => {
  const resolvedBreakpoints = breakpoints ?? PRODUCT_SWIPER_BREAKPOINT

  return (
    <div className={`product-swiper ${className}`}>
      <Suspense fallback={null}>
        <PWSwiper breakpoints={resolvedBreakpoints} pagination className='pw_swiper'>
          {data.map((product) => (
            <div key={product.id} className="mb-6 md:mb-10">
              <ProductCard product={product} />
            </div>
          ))}
        </PWSwiper>
      </Suspense>
    </div>
  )
}

export default ProductSwiper
