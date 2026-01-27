'use client'

import { IcoDown } from '@/components/icons'
import Dropdown from '@/components/ui/Dropdown'
import React, { useMemo, useState } from 'react'
import { IProductInfoProps, ProductInfoItem } from '../../type'
import { FIXED_INFOS } from '../../productDetail.contfig'

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

  const [openId, setOpenId] = useState<number | null>(
    productInfo[0]?.id ?? null
  )

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
          className="border-b-gray-300"
        >
          <p className="prose prose-sm md:prose-base text-sm max-w-none text-gray-700 mt-3 pb-4">
            {info.descriptionHtml && (
              <p
                dangerouslySetInnerHTML={{
                  __html: info.descriptionHtml,
                }}
              />
            )}

            {info.descriptionNode && info.descriptionNode}
          </p>
        </Dropdown>
      ))}
    </div>
  )
}

export default ProductInfo
