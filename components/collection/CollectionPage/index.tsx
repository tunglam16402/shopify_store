import Breadcrumb from '@/components/common/Breadcrumb'
import ExpandableText from '@/components/common/ExpandableText'
import { ProductCardProps } from '@/types/product/productCard'
import { cacheLife } from 'next/cache'
import React from 'react'
import Banner, { BannerData } from '../Banner'
import CollectionContent from '../CollectionContent'
import ShopByCategory from '../ShopByCategory'
import { CategoryMenu, Collection } from '../type'
import { getBreadcrumbFromMenu, getSubCategory } from './helper'
interface ICollectionPage {
  products: ProductCardProps[]
  bannerData: BannerData | null
  handle: string
  collections: Collection[]
  categoryMenus: CategoryMenu[]
}

const CollectionPage: React.FC<ICollectionPage> = async ({
  products,
  bannerData,
  handle,
  collections,
  categoryMenus,
}) => {
  'use cache'
  cacheLife('hours')
  const items = await getBreadcrumbFromMenu(handle)
  const category = getSubCategory(categoryMenus, handle)

  const currentCollection = collections.find((item) => item.handle === handle)
  const subCategories = category?.collections ?? []

  return (
    <div className="main-width pt-8!">
      {bannerData && <Banner bannerData={bannerData} />}
      <div className="mt-4 md:mt-6">
        <Breadcrumb items={items} />
      </div>
      <div className="mt-4 md:mt-6">
        <h1 className="text-3xl md:text-5xl uppercase font-light">
          {currentCollection?.title}
        </h1>
        {currentCollection?.description && (
          <ExpandableText
            text={currentCollection.description}
            lineClamp={4}
            className="text-sm md:text-base md:w-2/3 mt-2 md:mt-6"
          />
        )}
      </div>
      <div className="mt-6 md:mt-10">
        <ShopByCategory subCategories={subCategories} />
      </div>
      <CollectionContent products={products} tiles={bannerData?.tiles} />
    </div>
  )
}

export default CollectionPage
