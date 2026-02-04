import CartPage from '@/components/cart/CartPage'
import { Suspense } from 'react'

const Cart = () => {
  return (
    <div className='mobile-mt'>
      <Suspense fallback={null}>
        <CartPage />
      </Suspense>
    </div>
  )
}

export default Cart
