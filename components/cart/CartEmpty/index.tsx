import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <h2 className="mt-6 text-lg font-semibold text-gray-900">
        Your cart is empty
      </h2>

      <p className="mt-2 max-w-sm text-sm text-gray-500">
        Looks like you haven’t added anything to your cart yet. Start exploring
        our products and find something you love.
      </p>

      <Link href="/products" className="mt-6">
        <Button className='rounded-none uppercase md:text-lg md:px-10 md:py-6' variant={'primary'}>Continue shopping</Button>
      </Link>
    </div>
  )
}

export default CartEmpty
