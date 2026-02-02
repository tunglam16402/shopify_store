import { Button } from '@/components/ui/Button'
import { CartSubTotal } from '@/types/cart'
import Link from 'next/link'
import CartSubtotal from '../CartSubtotal'
import { paymentMethodsMock } from '@/config/payment.config'

interface ICartFooter {
  isClose: () => void
  subTotal?: CartSubTotal
}

const CartFooter = ({ isClose, subTotal }: ICartFooter) => {
  return (
    <div className="sticky bottom-0 z-11 bg-[#F1EFEF] p-4 md:px-6">
      <CartSubtotal subTotal={subTotal} />

      <div className="mt-4 md:mt-6">
        <Link href="/cart">
          <Button
            variant={'primary'}
            className="w-full rounded-none md:py-6 md:text-lg"
            onClick={isClose}
          >
            CHECKOUT
          </Button>
        </Link>
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
