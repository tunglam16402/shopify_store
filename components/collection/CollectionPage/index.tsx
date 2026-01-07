/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductList } from '@/components/products'
import React from 'react'
import Banner from '../Banner'
import { ProductCardProps } from '@/types/product/productCard'

interface ICollectionPage {
  products: ProductCardProps[]
  bannerData: any
}

const CollectionPage: React.FC<ICollectionPage> = ({ products, bannerData }) => {
  return (
    <div className="main-width mx-auto">
      {bannerData && <Banner bannerData={bannerData} />}
      <ProductList products={products} tiles={bannerData?.tiles}/>
    </div>
  )
}

export default CollectionPage
