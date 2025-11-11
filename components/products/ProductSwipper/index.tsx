import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import ProductCard from '../ProductCard'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ProductCardProps } from '@/types/product/productCard'

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
  navigation?: boolean
  pagination?: boolean
  autoplay?: boolean
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween?: number }>
  className?: string
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({
  data,
  navigation = true,
  pagination = false,
  autoplay = false,
  breakpoints,
  className = '',
}) => {
  return (
    <div className={`product-swiper ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        autoplay={
          autoplay ? { delay: 3000, disableOnInteraction: false } : false
        }
        breakpoints={breakpoints || PRODUCT_SWIPER_BREAKPOINT}
      >
        {data.map((product, index) => (
          <SwiperSlide key={product.id || index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductSwiper
