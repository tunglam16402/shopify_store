import CollectionPage from '@/components/collection/CollectionPage'
import { getBannerData } from '@/components/collection/CollectionPage/helper'
import {
  getCollectionProductsByHandle,
  getCollections,
  getSortedCollectionProducts,
} from '@/shopify/api/operations/get-collection'
import {
  flattenMenuForCategories,
  getMainMenu,
} from '@/shopify/api/operations/get-menu'
import { parseSort } from '@/shopify/helper'
import { cacheLife } from 'next/cache'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ handle: string }>
  searchParams: Promise<{ sort?: string }>
}

const Collection = async ({ params, searchParams }: Props) => {
  // 'use cache'
  // cacheLife('hours')

  const { handle } = await params
  const { sortKey, reverse } = parseSort((await searchParams)?.sort)

  const products = await getCollectionProductsByHandle(handle)
  const sort = await getSortedCollectionProducts({
    handle,
    sortKey,
    reverse,
  })
  const collections = await getCollections()
  const bannerData = await getBannerData(`/collections/${handle}`)
  const menus = await getMainMenu()
  const categoryMenus = flattenMenuForCategories(menus)

  return (
    <main className="mt-[100px] md:mt-0">
      <Suspense fallback={null}>
        <CollectionPage
          products={products}
          bannerData={bannerData}
          handle={handle}
          collections={collections}
          categoryMenus={categoryMenus}
          sort={sort}
        />
      </Suspense>
    </main>
  )
}

export default Collection
