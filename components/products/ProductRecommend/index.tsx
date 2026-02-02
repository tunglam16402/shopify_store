import ProductSwiper, {
  PRODUCT_SWIPER_BREAKPOINT,
  SwiperBreakpoint,
} from '../ProductSwiper'
import { ProductCardProps } from '@/types/product/productCard'
import StyledHeading from '@/components/ui/StyledHeading'

interface ProductRecommendProps {
  data?: ProductCardProps[]
  title: string
  className?: string
  headingClassName?: string
  subHeadingClassName?: string
  swiperBreakpoints?: Record<number, SwiperBreakpoint>
  styleHeadingClassName?: string
}

const ProductRecommend = ({
  data,
  title,
  className,
  headingClassName = 'uppercase text-3xl md:text-[42px]',
  subHeadingClassName = 'font-sub-heading font-bold text-4xl md:text-5xl',
  swiperBreakpoints = PRODUCT_SWIPER_BREAKPOINT,
  styleHeadingClassName = 'text-center',
}: ProductRecommendProps) => {
  if (!data?.length) return null

  return (
    <section className={className}>
      <div className={styleHeadingClassName}>
        <StyledHeading
          text={title}
          headingClass={headingClassName}
          subHeadingClass={subHeadingClassName}
        />
      </div>

      <ProductSwiper
        data={data}
        className="mt-4 md:mt-6"
        breakpoints={swiperBreakpoints}
      />
    </section>
  )
}

export default ProductRecommend
