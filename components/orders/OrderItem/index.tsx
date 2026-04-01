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
        <div className="relative h-[130px] w-[113px] min-w-[113px] md:h-[150px] md:w-[138px] md:min-w-[138px]">
          <Image
            src={image?.url || '/product-img-placeholder.svg'}
            fill
            alt={image?.altText || product?.title || 'product image'}
            className="object-contain"
            sizes='(max-width: 768px) 113px, 138px'
          />

          <div className="bg-primary absolute -top-2 right-0 flex h-5 w-5 items-center justify-center rounded-full font-semibold text-white">
            {item.quantity}
          </div>
        </div>

        <div>
          <div className="mt-1 text-sm font-bold md:mt-2 md:text-base">
            {product?.title}
          </div>

          <div className="">{product?.vendor}</div>

          {price && (
            <div className="mt-2 font-bold md:mt-3">
              <span>${Number(price).toFixed(2)}</span>

              {compareAtPrice && Number(compareAtPrice) > Number(price) && (
                <s className="ml-3 font-normal text-primary">${Number(compareAtPrice).toFixed(2)}</s>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default OrderItem
