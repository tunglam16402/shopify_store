import { Button } from '@/components/ui/Button'
import { paymentMethodsMock } from '@/config/payment.config'
import { CartSubTotal } from '@/types/cart'
import CartSubtotal from '../CartSubtotal'

interface ICartFooter {
  handleOnClick?: () => void
  subTotal?: CartSubTotal
}

const CartFooter = ({ handleOnClick, subTotal }: ICartFooter) => {
  return (
    <div className="sticky bottom-0 z-2 bg-[#F1EFEF] p-4 md:px-6">
      <CartSubtotal subTotal={subTotal} />

      <div className="mt-4 md:mt-6">
        <Button
          variant={'primary'}
          className="w-full rounded-none uppercase py-5 md:py-6 text-lg"
          onClick={handleOnClick}
        >
          Checkout
        </Button>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center justify-center gap-1">
          {paymentMethodsMock.map((method) => (
            <div key={method.id} className="h-4 md:h-5">
              {method.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CartFooter
