import { getAllProduct } from '../api/operations/get-product'

export async function getProductsByWidget(widgetId: string) {
  const products = await getAllProduct()

  switch (widgetId) {
    case 'bestseller':
      return products
        .filter((p) => (p.category || '').toLowerCase().includes('best'))
        .slice(0, 8)

    case 'lastest':
    default:
      return [...products]
        .sort((a, b) => {
          const dateA = new Date(a.publishedAt || 0).getTime()
          const dateB = new Date(b.publishedAt || 0).getTime()
          return dateB - dateA
        })
        .slice(0, 8)
  }
}
