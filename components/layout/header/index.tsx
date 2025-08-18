import getMainMenuQuery from '@/graphql/get-main-menu-query'
import getAllCollectionQuery from '@/graphql/get-all-collection-query'

import { shopifyFetch } from '@/lib/shopify'
import { transformShopifyUrl } from '@/lib/helper'

import {
  GetMainMenuQuery,
  GetAllCollectionQuery,
} from '@/types/shopify/graphql'

import TopHeader from './TopHeader'
import MainHeader from './MainHeader'
import SubHeader from './SubHeader'

export default async function Header() {
  const mainMenuData = await shopifyFetch<GetMainMenuQuery>({
    query: getMainMenuQuery,
  })
  const menuItems =
    mainMenuData?.menu?.items.map((item) => ({
      title: item.title,
      url: transformShopifyUrl(item.url),
    })) || []

  const collectionData = await shopifyFetch<GetAllCollectionQuery>({
    query: getAllCollectionQuery,
  })
  const collections =
    collectionData?.collections?.nodes.map((col) => ({
      handle: col.handle,
      title: col.title,
    })) || []

  return (
    <header>
      <TopHeader />
      <MainHeader menuItems={menuItems} />
      <SubHeader collections={collections} />
    </header>
  )
}
