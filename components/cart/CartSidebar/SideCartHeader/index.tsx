import { IcoClose } from '@/components/icons'
import StyledHeading from '@/components/ui/StyledHeading'
import { CartSubTotal } from '@/types/cart'
import ShippingProgressBar from '../ShippingProgressBar'
interface SideCartHeader {
  subTotal?: CartSubTotal
  isClose?: () => void
}

const SideCartHeader = ({ subTotal, isClose }: SideCartHeader) => {
  return (
    <div className="sticky top-0 z-2 bg-white">
      <div className="relative px-4 py-2 md:px-6 md:py-4">
        {/* Close button */}
        <button
          type="button"
          onClick={isClose}
          aria-label="Close cart"
          className="absolute top-7 right-4 md:top-9 md:right-6"
        >
          <IcoClose className="size-4 transition-transform duration-300 hover:rotate-90 md:size-5" />
        </button>

        <StyledHeading
          headingClass="text-4xl md:text-[54px]"
          subHeadingClass="font-sub-heading text-5xl md:text-[68px]"
          text="Shopping cart"
        />
        <div className="mt-8 md:mt-10">
          <ShippingProgressBar subTotal={subTotal} />
        </div>
      </div>
    </div>
  )
}

export default SideCartHeader
