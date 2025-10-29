/* eslint-disable @typescript-eslint/no-explicit-any */
import { transformShopifyUrl } from '@/lib/helper'
import { shopifyFetch } from '../../fetcher'
import { GetMainMenuQuery } from '../../types/graphql'
import getMainMenuQuery from '../../utils/query/get-main-menu-query'
import { ChildItem, MenuItem } from '@/types/collection/menuCollection'

function mapMenuItem(item: any): MenuItem {
  const children: ChildItem[] =
    item.items?.map((child: any) => {
      // Mỗi "child" có thể có thêm 1 cấp "grandchild"
      const grandChildren = child.items?.map((grand: any) => {
        const images: string[] =
          grand.resource?.__typename === 'Collection' && grand.resource.image?.url
            ? [grand.resource.image.url]
            : []

        return {
          title: grand.title,
          url: transformShopifyUrl(grand.url),
          image: images,
        }
      }) || []

      return {
        title: child.title,
        url: transformShopifyUrl(child.url),
        // Nếu có cấp 3 thì dùng ảnh của cấp 3, còn nếu không thì rỗng
        image: [],
        children: grandChildren,
      }
    }) || []

  return {
    title: item.title,
    url: transformShopifyUrl(item.url),
    children,
  }
}

export async function getMainMenu(): Promise<MenuItem[]> {
  const data = await shopifyFetch<GetMainMenuQuery>({
    query: getMainMenuQuery,
  })

  const menuItems = data?.menu?.items.map(mapMenuItem) || []
  return menuItems
}
