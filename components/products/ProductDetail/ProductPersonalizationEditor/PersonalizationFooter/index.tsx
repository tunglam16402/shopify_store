import AddToCart from '@/components/products/AddToCart'
import { CartLinePersonalizationPayload } from '@/shopify/cart/use-cart'
import { ProductDetailProps } from '../..'

interface IPersonalizationFooter {
  product: ProductDetailProps['product']
  totalPrice: number
  personalization: CartLinePersonalizationPayload
}

const PersonalizationFooter = ({
  product,
  totalPrice,
  personalization
}: IPersonalizationFooter) => {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-20 flex flex-col md:flex-row items-center md:justify-between gap-2 p-4 md:px-8
        bg-white border-t"
    >
      <div className="font-semibold text-base md:text-lg">
        Personalization of {product.title} | Personalized
      </div>
      <div className="w-full md:w-fit">
        <AddToCart
          variantId={product.variant?.id || ''}
          className="w-full md:w-fit md:px-24 md:text-lg bg-primary hover:bg-white! text-white hover:text-black!"
          showPrice={true}
          product={product}
          price={totalPrice}
          personalization={personalization}
        />
      </div>
      <label className="items-center gap-2 text-sm cursor-pointer mt-2 md:hidden flex">
        <input
          type="checkbox"
          className="peer w-4 h-4 accent-primary cursor-pointer"
          required
        />
        <span className="text-gray-500 peer-checked:text-black transition">
          I understand that personalized products are non-refundable.
        </span>
      </label>
    </div>
  )
}

export default PersonalizationFooter
