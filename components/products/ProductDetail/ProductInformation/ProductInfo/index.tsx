'use client'

import React, { ReactNode, useMemo, useState } from 'react'
import Dropdown from '@/components/ui/Dropdown'
import { IcoDown } from '@/components/icons'

/* =======================
  Types
======================= */

interface IProductInfoProps {
  description: string // Shopify descriptionHtml
  information: string // Shopify descriptionHtml
}

interface ProductInfoItem {
  id: number
  title: string
  descriptionHtml?: string
  descriptionNode?: ReactNode
}

const FIXED_INFOS: ProductInfoItem[] = [
  {
    id: 3,
    title: 'Shipping & Returns',
    descriptionNode: (
      <>
        <strong>Express shipping available for €15</strong> — order before 1 PM
        for next business day delivery.
        <br />
        <strong>Free shipping on orders over €69</strong> — available in all
        markets.
        <br />
        <strong>30-days return policy</strong> — try it out, love it or return
        it.
      </>
    ),
  },
  {
    id: 4,
    title: 'Payment Options',
    descriptionNode: (
      <>
        <strong>Secure and trusted payments with:</strong>
        <br />
        <br />
        Klarna
        <br />
        PayPal
        <br />
        American Express
        <br />
        Visa
        <br />
        Mastercard
        <br />
        Apple Pay
        <br />
        Google Pay
        <br />
        Maestro
        <br />
        UnionPay
        <br />
        Shop Pay
      </>
    ),
  },
  {
    id: 5,
    title: 'Contact Information',
    descriptionNode: (
      <>
        Printworks
        <br />
        Birger Jarlsgatan 55
        <br />
        11145 Stockholm SE
        <br />
        info@printworksmarket.com
      </>
    ),
  },
]

const ProductInfo: React.FC<IProductInfoProps> = ({
  description,
  information,
}) => {
  const productInfo = useMemo<ProductInfoItem[]>(
    () => [
      {
        id: 1,
        title: 'Description',
        descriptionHtml: description,
      },
      {
        id: 2,
        title: 'Product Information',
        descriptionHtml: information,
      },
      ...FIXED_INFOS,
    ],
    [description, information]
  )

  const [openId, setOpenId] = useState<number | null>(productInfo[0]?.id ?? null)

  return (
    <div className="space-y-4">
      {productInfo.map((info) => (
        <Dropdown
          key={info.id}
          title={info.title}
          isOpen={openId === info.id}
          onToggle={() =>
            setOpenId((prev) => (prev === info.id ? null : info.id))
          }
          openIcon={<IcoDown className="h-5 w-5" />}
          closeIcon={<IcoDown className="h-5 w-5" />}
          className="text-black text-sm md:text-base"
        >
          <div className="prose prose-sm md:prose-base max-w-none text-gray-700 mt-3">
            {info.descriptionHtml && (
              <div
                dangerouslySetInnerHTML={{
                  __html: info.descriptionHtml,
                }}
              />
            )}

            {info.descriptionNode && info.descriptionNode}
          </div>
        </Dropdown>
      ))}
    </div>
  )
}

export default ProductInfo
