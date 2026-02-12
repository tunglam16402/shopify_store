import StyledHeading from '@/components/ui/StyledHeading'
import { CartSubTotal } from '@/types/cart'
import ShippingProgressBar from '../ShippingProgressBar'
interface SideCartHeader {
  subTotal?: CartSubTotal
}

const SideCartHeader = ({ subTotal }: SideCartHeader) => {
  return (
    <div className="sticky top-0 z-2 bg-white">
      <div className="relative px-4 py-2 md:px-6 md:py-4">
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
