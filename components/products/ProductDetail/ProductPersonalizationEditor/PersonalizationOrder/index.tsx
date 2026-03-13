import { ProductDetailProps } from '../..'

interface IPersonalizationOrder {
  product: ProductDetailProps['product']
  totalPrice: number
}

const PersonalizationOrder = ({
  product,
  totalPrice,
}: IPersonalizationOrder) => {
  return (
    <div className="rounded-md bg-gray-100 p-6 md:mt-6">
      <h5 className="text-3xl">Your order</h5>

      <div className="mt-4 border-b border-gray-300 pb-4">
        <div className="flex justify-between font-medium">
          <div>Personalization of {product.title}</div>
          <div>
            {product.variant?.currency}
            {product.variant?.basePrice}
          </div>
        </div>

        <div className="flex justify-between font-light">
          <div>Personalization:</div>
          <div>
            {product.variant?.currency}
            {Number(totalPrice - (product?.variant?.basePrice ?? 0)).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between font-semibold">
        <div className="uppercase">Total</div>
        <div>
          {product.variant?.currency}
          {totalPrice}
        </div>
      </div>
    </div>
  )
}

export default PersonalizationOrder
