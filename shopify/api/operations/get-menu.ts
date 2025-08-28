import { transformShopifyUrl } from '@/lib/helper'
import { shopifyFetch } from '../../fetcher'
import { GetMainMenuQuery } from '../../types/graphql'
import getMainMenuQuery from '../../utils/query/get-main-menu-query'

export async function getMainMenu() {
  const data = await shopifyFetch<GetMainMenuQuery>({
    query: getMainMenuQuery,
  })
  const menuItems =
    data?.menu?.items.map((item) => ({
      title: item.title,
      url: transformShopifyUrl(item.url),
    })) || []

  return menuItems
}
