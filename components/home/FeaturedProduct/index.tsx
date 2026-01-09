import { getProductsByWidget } from '@/shopify/utils/get-product-by-widget'
import { GroupField } from '@prismicio/client'
import {
  HomepageDocumentDataProductSectionItem,
  Simplify,
} from '@/prismicio-types'
import FeaturedProductGroup from './FeatureProductGroup'

interface IFeaturedProductServer {
  products: GroupField<Simplify<HomepageDocumentDataProductSectionItem>>
  width?: string
}

const FeaturedProductServer = async ({
  products,
  width,
}: IFeaturedProductServer) => {
  if (!products?.length) return null

  const allData = await Promise.all(
    products.map(async (rawSection) => {
      const widgetId = rawSection.widget_id || 'latest'
      const items = await getProductsByWidget(widgetId)

      return {
        widgetId,
        section: {
          heading_title: rawSection.heading_title ?? '',
          sub_title: rawSection.sub_title ?? undefined,
          heading_title_2: rawSection.heading_title_2 ?? undefined,
        },
        items,
      }
    })
  )

  const validSections = allData.filter((d) => d.items?.length)

  if (!validSections.length) return null

  return (
    <section className={width}>
      <FeaturedProductGroup sections={validSections} />
    </section>
  )
}

export default FeaturedProductServer
