'use client'

import React, { ReactNode } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules'
import styles from './style.module.css'

type Breakpoint = {
  slidesPerView: number
  slidesPerGroup?: number
  spaceBetween?: number
}

type PWSwiperProps = {
  children: ReactNode[]
  autoplay?: boolean
  loop?: boolean
  navigation?: boolean
  pagination?: boolean
  breakpoints?: Record<number, Breakpoint>
  className?: string
  initialSlide?: number
  freeMode?: boolean
}

export const DEFAULT_BREAKPOINTS: Record<number, Breakpoint> = {
  0: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 8 },
  640: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 8 },
  1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 24 },
}

export const ONE_ITEMS_BREAKPOINTS: Record<number, Breakpoint> = {
  0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0 },
  640: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0 },
  1024: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0 },
}

const PWSwiper: React.FC<PWSwiperProps> = ({
  children,
  autoplay = false,
  navigation = true,
  freeMode = false,
  pagination = true,
  loop = false,
  breakpoints = DEFAULT_BREAKPOINTS,
  className = '',
  initialSlide = 1,
}) => {
  const slideCount = React.Children.count(children)

  const enableNavigation = navigation && slideCount > 1
  const enablePagination = pagination && slideCount > 1
  const enableLoop = loop && slideCount > 1

  return (
    <div className={`${styles['pw-swiper']} ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, FreeMode]}
        navigation={enableNavigation}
        speed={500}
        freeMode={freeMode}
        initialSlide={initialSlide}
        loop={enableLoop}
        pagination={
          enablePagination
            ? {
                el: '.pw-swiper-progress',
                type: 'progressbar',
              }
            : false
        }
        autoplay={
          autoplay ? { delay: 3000, disableOnInteraction: false } : false
        }
        breakpoints={breakpoints}
      >
        {children.map((child, idx) => (
          <SwiperSlide key={idx}>{child}</SwiperSlide>
        ))}
        {enablePagination && <div className="pw-swiper-progress"></div>}
      </Swiper>
    </div>
  )
}

export default PWSwiper
