import { getBannerData } from '@/components/collection/Banner/helper'
import CollectionPage from '@/components/collection/CollectionPage'
import { toURLSearchParams } from '@/lib/helper'
import {
  getCollectionProductsByHandle,
  getCollections,
} from '@/shopify/api/operations/get-collection'
import { getCategoryMenus } from '@/shopify/api/operations/get-menu'
import { buildProductFilters, parseCollectionSort } from '@/shopify/helper'

type Props = {
  params: Promise<{ handle: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

const Collection = async ({ params, searchParams }: Props) => {
  const { handle } = await params
  const filterSearch = await searchParams
  const { sortKey, reverse } = parseCollectionSort(filterSearch?.sort)

  const filters = buildProductFilters(toURLSearchParams(filterSearch))

  const {
    products,
    filters: facets,
    globalPriceFilters,
  } = await getCollectionProductsByHandle({
    handle,
    sortKey,
    reverse,
    filters,
  })
  const collections = await getCollections()
  const bannerData = await getBannerData(`/collections/${handle}`)
  const categoryMenus = await getCategoryMenus()

  return (
    <CollectionPage
      products={products}
      facets={facets}
      globalPrice={globalPriceFilters}
      bannerData={bannerData}
      handle={handle}
      collections={collections}
      categoryMenus={categoryMenus}
    />
  )
}

export default Collection
