// 'use client'

// import { Button } from '@/components/ui/Button'
// import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
// import { useUI } from '@/lib/hooks/useContext'
// import { addItem } from '@/store/thunks/cartThunk'
// import { useState } from 'react'

// type AddToCartButtonProps = {
//   variantId: string
//   quantity?: number
// }

// const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
//   const dispatch = useAppDispatch()
//   const { open } = useUI('cart')
//   const [loading, setLoading] = useState(false)

//   const handleAddToCart = async () => {
//     try {
//       setLoading(true)
//       await dispatch(addItem({ variantId, quantity })).unwrap()
//       open?.()
//     } catch (err) {
//       console.error('Add to cart failed', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Button
//       onClick={handleAddToCart}
//       disabled={loading}
//       className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
//     >
//       {loading ? 'Adding...' : 'Add to Cart'}
//     </Button>
//   )
// }

// export default AddToCartButton

'use client'

import { addItem } from '@/components/cart/action'
import { useShopifyAnalytics } from '@/shopify/hooks/use-shopify-analytics'
import { useActionState, useEffect } from 'react'
import { useFormState } from 'react-dom'

const AddToCartButton = ({
  variantId,
  // availableForSale,
}: {
  variantId: string
  // availableForSale: boolean
}) => {
  const { sendAddToCart } = useShopifyAnalytics()
  const [response, formAction] = useActionState(addItem, null)

  const actionWithVariant = formAction.bind(null, variantId)

  useEffect(() => {
    if (response?.success && response.cartId) {
      sendAddToCart({
        cartId: response.cartId,
        // Optionally: product info, value...
      })
    }
  }, [response?.success, response?.cartId, sendAddToCart])

  return (
    <form action={actionWithVariant}>
      <button
        type="submit"
        // disabled={!availableForSale}
        className="px-4 py-2 bg-black text-white rounded"
      >
        {/* {availableForSale ? "Add to Cart" : "Sold Out"} */}
       Add to Cart
      </button>
      {response?.message && (
        <p aria-live="polite" className="sr-only" role="status">
          {response.message}
        </p>
      )}
    </form>
  )
}

export default AddToCartButton