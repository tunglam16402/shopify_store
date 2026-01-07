'use client'

import React, { useMemo, useState } from 'react'
import Dropdown from '@/components/ui/Dropdown'
import { IcoDown, IcoUp } from '@/components/icons'

interface IProductInfo {
  description: string
  information: string
}

const FIXED_INFOS = [
  {
    id: 3,
    title: 'Shipping & Returns',
    description: (
      <>
        <strong>Express shipping available for €15</strong> — order before 1 PM
        for next business day delivery. <br />
        <strong>Free shipping on orders over €69</strong> — available in all
        markets. <br />
        <strong>30-days return policy</strong> — try it out, love it or return
        it.
      </>
    ),
  },
  {
    id: 4,
    title: 'Payment Options',
    description: (
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
    description: `Printworks
Birger Jarlsgatan 55
11145 Stockholm SE
info@printworksmarket.com.`,
  },
]

const ProductInfo: React.FC<IProductInfo> = ({ description, information }) => {
  const productInfo = useMemo(
    () => [
      { id: 1, title: 'Description', description },
      { id: 2, title: 'Product Information', description: information },
      ...FIXED_INFOS,
    ],
    [description, information]
  )
  const [openId, setOpenId] = useState<number | null>(productInfo[0].id)

  return (
    <div className="text-white space-y-4">
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
          <p className="text-xs md:text-sm mt-3 whitespace-pre-line text-gray-700">
            {info.description}
          </p>
        </Dropdown>
      ))}
    </div>
  )
}

export default ProductInfo
