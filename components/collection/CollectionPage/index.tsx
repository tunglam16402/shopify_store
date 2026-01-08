/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductList } from '@/components/products'
import React from 'react'
import Banner from '../Banner'
import { ProductCardProps } from '@/types/product/productCard'
import Breadcrumb from '@/components/common/Breadcrumb'
import { getBreadcrumbFromMenu } from './helper'
import { Collection } from './type'
import ExpandableText from '@/components/common/ExpandableText'

interface ICollectionPage {
  products: ProductCardProps[]
  bannerData: any
  handle: string
  collections: Collection[]
}

const CollectionPage: React.FC<ICollectionPage> = async ({
  products,
  bannerData,
  handle,
  collections,
}) => {
  const items = await getBreadcrumbFromMenu(handle)
  const currentCollection = collections.find((item) => item.handle === handle)
  console.log('collections :>> ', currentCollection)

  return (
    <div className="main-width pt-8!">
      <Breadcrumb items={items} />
      <div className="mt-4">
        <h1 className="text-3xl uppercase font-light">
          {currentCollection?.title}
        </h1>
        {currentCollection?.description && (
          <ExpandableText text={currentCollection.description} lineClamp={4} className='text-sm md:text-base w-2/3 mt-4'/>
        )}
      </div>
      {bannerData && <Banner bannerData={bannerData} />}
      <ProductList products={products} tiles={bannerData?.tiles} />
    </div>
  )
}

export default CollectionPage
