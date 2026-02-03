import { Button } from '@/components/ui/Button'
import { useUI } from '@/lib/hooks/useContext'
import Link from 'next/link'

interface ICartEmpty {
  headingClassName?: string
  subClassName?: string
}

const CartEmpty = ({
  headingClassName = 'mt-6 text-3xl font-semibold text-gray-900',
  subClassName = 'mt-6 max-w-sm text-sm text-gray-500 md:mt-8',
}: ICartEmpty) => {
  const { close } = useUI('cart')

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <h2 className={headingClassName}>Your cart is empty!</h2>

      <p className={subClassName}>
        Looks like you haven’t added anything to your cart yet. Start exploring
        our products and find something you love.
      </p>

      <Link href="/products" className="mt-6 md:mt-8">
        <Button
          className="rounded-none uppercase md:px-10 md:py-6 md:text-lg"
          variant={'primary'}
          onClick={close}
        >
          Continue shopping
        </Button>
      </Link>
    </div>
  )
}

export default CartEmpty
