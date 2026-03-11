import Image from 'next/image'
import Link from 'next/link'
import { LineItem } from '@/types/customer/order'

interface IOrderItem {
  item: LineItem
}

const OrderItem: React.FC<IOrderItem> = ({ item }) => {
  const product = item?.variant?.product
  const variant = product?.variants?.nodes?.[0]
  const image = product?.images?.nodes?.[0]

  const price = variant?.price?.amount
  const compareAtPrice = variant?.compareAtPrice?.amount

  return (
    <Link href={product?.handle ? `/products/${product.handle}` : '#'}>
      <div className="flex gap-3">
        <div className="relative h-[113px] w-[113px] min-w-[113px] border border-[#f6f5f4] md:h-[138px] md:w-[138px] md:min-w-[138px]">
          <Image
            src={image?.url || '/product-img-placeholder.svg'}
            fill
            alt={image?.altText || product?.title || 'product image'}
            className="object-contain"
          />

          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#909090] font-semibold text-white">
            {item.quantity}
          </div>
        </div>

        <div>
          <div className="font-bold">{product?.vendor}</div>

          <div className="mt-1 text-sm md:mt-2 md:text-base">
            {product?.title}
          </div>

          {price && (
            <div className="mt-2 font-bold md:mt-3">
              <span>${Number(price).toFixed(2)}</span>

              {compareAtPrice && Number(compareAtPrice) > Number(price) && (
                <s className="ml-3">${Number(compareAtPrice).toFixed(2)}</s>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default OrderItem
