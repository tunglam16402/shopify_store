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
        <p className="mb-1 text-sm text-gray-600 uppercase">
          {product.collection?.title}
        </p>

        <StyledHeading
          text={product?.title}
          headingClass="uppercase text-4xl md:text-[54px]"
          subHeadingClass="font-sub-heading text-[42px] md:text-5xl"
        />

        {/* Ratings */}
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={avgRating} size={5} />

          <span className="text-sm text-gray-600 md:text-base">
            {avgRating.toFixed(1)} ({totalReviews} Review
            {totalReviews !== 1 ? 's' : ''})
          </span>
        </div>

        {/* Price */}
        <div className="mt-6">
          {productPrice?.compareAtPrice &&
          productPrice.compareAtPrice > productPrice.basePrice ? (
            <div className="flex items-center">
              <div className="text-2xl text-red-400 line-through">
                {productPrice.currency}
                {productPrice.compareAtPrice}
              </div>

              <div className="border-sub-primary text-sub-primary mx-3 flex h-7 items-center rounded-3xl border px-3 text-base">
                {productPrice.discountPercent}% Off
              </div>

              <div className="text-3xl font-semibold">
                {productPrice.currency}
                {productPrice.basePrice}
              </div>
            </div>
          ) : (
            <p className="text-3xl font-semibold">
              {productPrice?.currency}
              {productPrice?.basePrice}
            </p>
          )}
        </div>

        {/* Color variants */}
        {product.colorVariants.length > 0 && (
          <div className="mt-10 flex gap-2">
            {product.colorVariants.map((v) => {
              const isActive = v.handle === product.handle
              return (
                <Link key={v.handle} href={`/products/${v.handle}`}>
                  <Image
                    src={v.image || '/placeholder.png'}
                    alt=""
                    width={64}
                    height={64}
                    className={`rounded border-2 object-cover md:h-24 md:w-20 ${
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
        <div className="mt-8 flex items-center gap-3 md:mt-12 md:gap-6">
          <QuantityInput
            value={quantity}
            min={1}
            max={MAX_QUANTITY}
            onChange={handleChangeQuantity}
            className="h-12 border border-gray-200"
          />
          <div className="w-full">
            <AddToCart
              variantId={product.variant?.id || ''}
              quantity={quantity}
              className="bg-primary w-full py-6 text-base text-white hover:bg-white! hover:text-black! md:text-lg"
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
          <div className="mt-8 border border-gray-600 px-6 py-4">
            <div className="flex justify-between">
              <div>
                <div className="text-base font-semibold uppercase md:text-lg">
                  Make it your own
                </div>
                <div className="text-sm md:text-base">
                  Personalize your item with a custom text on the cover.
                </div>
              </div>
              <div className="font-semibold md:text-base">$20</div>
            </div>
            <Button
              variant={'primary'}
              className="mt-4 w-full rounded-none text-base font-semibold uppercase md:text-lg"
              onClick={() => setOpen(true)}
            >
              Personalize
            </Button>
            <div className="mt-2 text-xs font-light">
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
        <Modal className="h-screen w-screen" isOpen={open} hasClose={false}>
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
