'use client'

import PWSwiper from '@/components/ui/Swiper'
import Image from 'next/image'

type ProductImageProps = {
  images: string[]
  altText?: string
  title: string
}

export const MOBILE_IMAGE = {
  slidesPerView: 1,
  slidesPerGroup: 1,
}

const ProductImage = ({ images, altText, title }: ProductImageProps) => {
  if (!images || images.length === 0) return null

  return (
    <div>
      {/* Mobile */}
      <PWSwiper
        className="md:hidden w-full pb-0!"
        pagination={true}
        breakpoints={MOBILE_IMAGE}
        loop={true}
      >
        {images.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={altText || title}
            height={500}
            width={500}
            sizes="100vw"
            className="object-contain w-full"
            priority={index === 0}
          />
        ))}
      </PWSwiper>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-2">
        {/* Ảnh đầu tiên chiếm toàn bộ 2 cột */}
        {images[0] && (
          <div className="col-span-2">
            <Image
              src={images[0]}
              alt={altText || title}
              height={800}
              width={1200}
              sizes="(min-width: 768px) 100vw, 100vw"
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Các ảnh còn lại chia đều 2 cột */}
        {images.slice(1).map((url, index) => (
          <div key={url} className="w-full">
            <Image
              src={url}
              alt={altText || title}
              height={500}
              width={500}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover  w-full h-auto"
              priority={index < 2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImage
