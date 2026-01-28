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
    <div className="bg-gray-100 p-6 rounded-md md:mt-6">
      <h5 className="text-3xl">Your order</h5>

      <div className="mt-4 pb-4 border-b border-gray-300">
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
            {Number(totalPrice - product.variant.basePrice).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4 font-semibold">
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
