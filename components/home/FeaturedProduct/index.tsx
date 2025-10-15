import { getProductsByWidget } from '@/shopify/utils/get-product-by-widget'
import { GroupField } from '@prismicio/client'
import {
  HomepageDocumentDataProductSectionItem,
  Simplify,
} from '@/prismicio-types'
import FeaturedProductGroup from './FeatureProductGroup'

interface IFeaturedProductServer {
  products: GroupField<Simplify<HomepageDocumentDataProductSectionItem>>
}

const FeaturedProductServer = async ({ products }: IFeaturedProductServer) => {
  if (!products?.length) return null

  const allData = await Promise.all(
    products.map(async (section) => {
      const widgetId = section.widget_id || 'latest'
      const items = await getProductsByWidget(widgetId)
      return { section, widgetId, items }
    })
  )

  const validSections = allData.filter((d) => d.items?.length)

  if (!validSections.length) return null

  return <FeaturedProductGroup sections={validSections} />
}

export default FeaturedProductServer
