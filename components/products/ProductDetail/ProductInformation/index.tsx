'use client'

import { QuantityInput } from '@/components/ui/QuantityInput'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import StyledHeading from '@/components/ui/StyledHeading'
import { useReviews } from '@/lib/hooks/useReviews'
import { ProductDetailProps } from '..'
import AddToCart from '../../AddToCart'
import StarRating from '../../ProductReview/TotalRating/StarRating'
import ProductBottomInfo from './ProductBottomInfo'
import ProductInfo from './ProductInfo'
import ProductUSP from './ProductUSP'
import { Button } from '@/components/ui/Button'
import { ProductPersonalizationEditor } from '../ProductPersonalizationEditor'
import Modal from '@/components/common/Modal'

type ProductInformationProps = {
  product: ProductDetailProps['product']
}

const MAX_QUANTITY = 99

const ProductInformation = ({ product }: ProductInformationProps) => {
  const productPrice = product.variant
  const [quantity, setQuantity] = useState(1)
  const [showBottomInfo, setShowBottomInfo] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  // const footerRef = useRef<HTMLElement | null>(null)
  const { data } = useReviews(product.id)

  const avgRating = data?.summary?.avgRating ?? 0
  const totalReviews = data?.summary?.totalReviews ?? 0

  useEffect(() => {
    const footer = document.getElementById('footer')
    if (!containerRef.current || !footer) return

    let isProductVisible = true
    let isFooterVisible = false

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === containerRef.current)
            isProductVisible = entry.isIntersecting
          if (entry.target === footer) isFooterVisible = entry.isIntersecting
        })
        setShowBottomInfo(!isProductVisible && !isFooterVisible)
      },
      { threshold: 0 }
    )

    observer.observe(containerRef.current)
    observer.observe(footer)

    return () => observer.disconnect()
  }, [])

  const handleChangeQuantity = (newQty: number) => {
    setQuantity(newQty)
  }

  return (
    <div className="page-width md:pr-20!" ref={containerRef}>
      {/* Collection title + Product title */}
      <div className="sticky top-24">
        <p className="text-gray-600 uppercase text-sm mb-1">
          {product.collection.title}
        </p>

        <StyledHeading
          text={product.title}
          headingClass="uppercase text-4xl md:text-[54px]"
          subHeadingClass="font-sub-heading text-[42px] md:text-5xl"
        />

        {/* Ratings */}
        <div className="flex items-center gap-2 mt-2 ">
          <StarRating rating={avgRating} size={5} />

          <span className="text-sm md:text-base text-gray-600">
            {avgRating.toFixed(1)} ({totalReviews} Review
            {totalReviews !== 1 ? 's' : ''})
          </span>
        </div>

        {/* Price */}
        <div className="mt-6">
          {productPrice?.compareAtPrice &&
          productPrice.compareAtPrice > productPrice.basePrice ? (
            <div className="flex items-center">
              <div className="text-red-400 line-through text-2xl ">
                {productPrice.currency}
                {productPrice.compareAtPrice}
              </div>

              <div className="mx-3 flex h-7 items-center rounded-3xl border border-sub-primary px-3 text-base text-sub-primary">
                {productPrice.discountPercent}% Off
              </div>

              <div className="text-3xl font-semibold">
                {productPrice.currency}
                {productPrice.basePrice}
              </div>
            </div>
          ) : (
            <p className="font-semibold text-3xl">
              {productPrice?.currency}
              {productPrice?.basePrice}
            </p>
          )}
        </div>

        {/* Color variants */}
        {product.colorVariants.length > 0 && (
          <div className="flex gap-2 mt-10">
            {product.colorVariants.map((v) => {
              const isActive = v.handle === product.handle
              return (
                <Link key={v.handle} href={`/products/${v.handle}`}>
                  <Image
                    src={v.image || '/placeholder.png'}
                    alt=""
                    width={64}
                    height={64}
                    className={`rounded object-cover border-2 md:w-20 md:h-24 ${
                      isActive ? 'border-sub-primary' : 'border-gray-200'
                    }`}
                    sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 10vw"
                  />
                </Link>
              )
            })}
          </div>
        )}

        {/* Quantity + AddToCart */}
        <div className="flex items-center gap-3 mt-8 md:mt-12 md:gap-6">
          <QuantityInput
            value={quantity}
            min={1}
            max={MAX_QUANTITY}
            onChange={handleChangeQuantity}
            className='h-12'
          />
          <div className="w-full">
            <AddToCart
              variantId={product.variant?.id || ''}
              quantity={quantity}
              className="w-full py-6 text-base md:text-lg bg-primary hover:bg-white! text-white hover:text-black!"
              product={product}
            />
          </div>
        </div>

        {/* USP */}
        <div className="mt-8">
          <ProductUSP />
        </div>

        {/* Personalize config */}
        {product.personalization && (
          <div className="border border-gray-600 px-6 py-4 mt-8">
            <div className="flex justify-between">
              <div>
                <div className="text-base md:text-lg uppercase font-semibold">
                  Make it your own
                </div>
                <div className="text-sm md:text-base">
                  Personalize your item with a custom text on the cover.
                </div>
              </div>
              <div className="md:text-base font-semibold">$20</div>
            </div>
            <Button
              variant={'primary'}
              className="uppercase text-base md:text-lg rounded-none font-semibold w-full mt-4"
              onClick={() => setOpen(true)}
            >
              Personalize
            </Button>
            <div className="text-xs mt-2 font-light">
              Personalized products are non-refundable. Note that delivery time
              is about 2 weeks due to the craftsmanship. Read more here
            </div>
          </div>
        )}

        {/* Product Info */}
        <div className="mt-8">
          <ProductInfo
            description={product.description}
            information={product.information}
          />
        </div>
      </div>

      {product.personalization && (
        <Modal
          className="w-screen h-screen"
          isOpen={open}
          hasClose={false}
        >
          <ProductPersonalizationEditor
            product={product}
            personalization={product.personalization}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
      <ProductBottomInfo product={product} show={showBottomInfo} />
    </div>
  )
}

export default ProductInformation
