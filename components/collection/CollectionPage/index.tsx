import Breadcrumb from '@/components/common/Breadcrumb'
import ExpandableText from '@/components/common/ExpandableText'
import { ProductCardProps } from '@/types/product/productCard'
import { cacheLife } from 'next/cache'
import React from 'react'
import Banner, { BannerData } from '../Banner'
import CollectionContent from '../CollectionContent'
import ShopByCategory from '../ShopByCategory'
import { CategoryMenu, Collection, Facets } from '../type'
import { getBreadcrumbFromMenu, getSubCategory } from './helper'
interface ICollectionPage {
  products: ProductCardProps[]
  bannerData: BannerData | null
  handle: string
  collections: Collection[]
  categoryMenus: CategoryMenu[]
  facets: Facets[]
  globalPrice: Facets[]
}

const CollectionPage: React.FC<ICollectionPage> = async ({
  products,
  bannerData,
  handle,
  collections,
  categoryMenus,
  facets,
  globalPrice,
}) => {
  'use cache'
  cacheLife('hours')
  const items = await getBreadcrumbFromMenu(handle)
  const category = await getSubCategory(categoryMenus, handle)
  const currentCollection = collections.find((item) => item.handle === handle)
  const subCategories = category?.collections ?? []

  return (
    <div className="mt-[132px] md:mt-4">
      {bannerData && <Banner bannerData={bannerData} />}
      <div className="page-width mt-4! md:mt-6!">
        <Breadcrumb items={items} />
      </div>
      <div className="page-width">
        <div className="mt-4 md:mt-6">
          <h1 className="text-3xl font-light uppercase md:text-5xl">
            {currentCollection?.title}
          </h1>
          {currentCollection?.description && (
            <ExpandableText
              text={currentCollection.description}
              lineClamp={4}
              className="mt-2 text-sm md:mt-6 md:w-2/3 md:text-base"
            />
          )}
        </div>
        <div className="mt-6 md:mt-10">
          <ShopByCategory subCategories={subCategories} />
        </div>
        <CollectionContent
          products={products}
          tiles={bannerData?.tiles}
          facets={facets}
          globalPrice={globalPrice}
        />
      </div>
    </div>
  )
}

export default CollectionPage
