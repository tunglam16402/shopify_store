'use client'

import { Button } from '@/components/ui/Button'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { useUI } from '@/lib/hooks/useContext'
import { addItem } from '@/store/thunks/cartThunk'
import { useState } from 'react'

type AddToCartButtonProps = {
  variantId: string
  quantity?: number
}

const AddToCartButton = ({ variantId, quantity = 1 }: AddToCartButtonProps) => {
  const dispatch = useAppDispatch()
  const { open } = useUI('cart')
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      await dispatch(addItem({ variantId, quantity })).unwrap()
      open?.()
    } catch (err) {
      console.error('Add to cart failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={loading}
      className="w-full py-2 text-black border  hover:text-white font-semibold transition-all duration-300"
    >
      {loading ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}

export default AddToCartButton

// 'use client'

// import { addItem } from '@/components/cart/action'
// // import { useShopifyAnalytics } from '@/shopify/hooks/use-shopify-analytics'
// import { useActionState } from 'react'

// const AddToCartButton = ({ variantId }: { variantId: string }) => {
//   // const { sendAddToCart } = useShopifyAnalytics()
//   const [response, formAction] = useActionState(addItem, null)

//   const actionWithVariant = formAction.bind(null, variantId)

//   // useEffect(() => {
//   //   if (response?.success && response.cartId && response.item) {
//   //     const product = response.item?.merchandise?.product
//   //     const variant = response.item?.merchandise

//   //     sendAddToCart({
//   //       cartId: response.cartId,
//   //       totalValue: Number(variant?.price?.amount ?? 0),
//   //       products: [
//   //         {
//   //           productGid: product?.id,
//   //           variantGid: variant?.id,
//   //           name: product?.title,
//   //           variantName: variant?.title,
//   //           brand: product?.vendor,
//   //           category: product?.productType,
//   //           price: variant?.price?.amount ?? 0,
//   //           sku: variant?.sku ?? undefined,
//   //           quantity: response.item?.quantity ?? 1,
//   //         },
//   //       ],
//   //     })
//   //   }
//   // }, [response, sendAddToCart])

//   return (
//     <form action={actionWithVariant}>
//       <button
//         type="submit"
//         className="px-4 py-2 bg-black text-white rounded"
//       >
//         Add to Cart
//       </button>
//       {response?.message && (
//         <p aria-live="polite" className="sr-only" role="status">
//           {response.message}
//         </p>
//       )}
//     </form>
//   )
// }

// export default AddToCartButton
