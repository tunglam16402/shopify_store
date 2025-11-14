'use client'

import { useEffect, useState } from 'react'
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
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } 
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!images || images.length === 0) return null

  const openLightbox = (i: number) => {
    setIndex(i)
    setZoom(1)
    setOpen(true)
  }

  return (
    <div>
      {/* Mobile */}
      <PWSwiper
        className="md:hidden w-full pb-0!"
        pagination={true}
        breakpoints={MOBILE_IMAGE}
        loop={true}
      >
        {images.map((url, i) => (
          <div key={i} onClick={() => openLightbox(i)}>
            <Image
              src={url}
              alt={altText || title}
              height={500}
              width={500}
              sizes="100vw"
              className="object-contain w-full cursor-pointer"
              priority={i === 0}
            />
          </div>
        ))}
      </PWSwiper>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-2 ">
        {images[0] && (
          <div className="col-span-2" onClick={() => openLightbox(0)}>
            <Image
              src={images[0]}
              alt={altText || title}
              height={800}
              width={1200}
              sizes="(min-width: 768px) 100vw, 100vw"
              className="object-cover w-full h-auto cursor-pointer"
              priority
            />
          </div>
        )}

        {images.slice(1).map((url, i) => (
          <div key={url} onClick={() => openLightbox(i + 1)}>
            <Image
              src={url}
              alt={altText || title}
              height={500}
              width={500}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover w-full h-auto cursor-pointer"
              priority={i < 2}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 bg-opacity-90 flex items-center justify-center z-[9999] cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <Image
            src={images[index]}
            alt={altText || title}
            fill
            style={{ transform: `scale(${zoom})` }}
            className=" object-contain transition-transform duration-200"
            onWheel={(e) => {
              e.stopPropagation()
              setZoom((prev) =>
                Math.min(Math.max(prev + e.deltaY * -0.001, 1), 3)
              )
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ProductImage
