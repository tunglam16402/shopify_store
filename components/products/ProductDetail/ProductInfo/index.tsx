import React from 'react'

interface IProductInfo {
  description: string
  information: string
}

const PRODUCT_INFO = [
    {

    }
]

const ProductInfo: React.FC<IProductInfo> = ({ description, information }) => {
  return (
    <div>
      <p className="mb-6">{description}</p>
      <p className="mb-6 whitespace-pre-line">{information}</p>
    </div>
  )
}

export default ProductInfo
