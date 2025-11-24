/* eslint-disable @typescript-eslint/no-explicit-any */
import { transformShopifyUrl } from '@/lib/helper'
import { shopifyFetch } from '../../fetcher'
import { GetMainMenuQuery } from '../../types/graphql'
import getMainMenuQuery from '../../utils/query/get-main-menu-query'
import { ChildItem, MenuItem } from '@/types/collection/menuCollection'

function mapMenuItem(item: any): MenuItem {
  const children: ChildItem[] =
    item.items?.map((child: any) => {
      const grandChildren =
        child.items?.map((grand: any) => {
          const images: string[] =
            grand.resource?.__typename === 'Collection' &&
            grand.resource.image?.url
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

export function flattenMenuForCategories(menu: MenuItem[]) {
  return menu.map((item) => {
    const collections =
      item.children?.flatMap(
        (child) =>
          child.children
            ?.filter((grandChild) => grandChild.url?.includes('/collections/'))
            .map((grandChild) => ({
              title: grandChild.title,
              url: grandChild.url,
              image: Array.isArray(grandChild.image)
                ? grandChild.image[0] 
                : grandChild.image, 
            })) || []
      ) || []

    return {
      title: item.title,
      url: item.url,
      collections,
    }
  })
}

export async function getMainMenu(): Promise<MenuItem[]> {
  const data = await shopifyFetch<GetMainMenuQuery>({
    query: getMainMenuQuery,
  })

  const menuItems = data?.menu?.items.map(mapMenuItem) || []
  return menuItems
}
