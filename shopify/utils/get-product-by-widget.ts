import { getAllProduct } from '../api/operations/get-product'

export async function getProductsByWidget(widgetId: string) {
  const products = await getAllProduct()

  const mappedProducts = products.map((p) => ({
    ...p,
    publishedAtTime: p?.publishedAt ? new Date(p.publishedAt).getTime() : 0,
  }))

  switch (widgetId) {
    case 'bestseller':
      return mappedProducts
        .filter((p) => (p.category || '').toLowerCase().includes('best'))
        .slice(0, 8)

    case 'lastest':
    default:
      return [...mappedProducts]
        .sort((a, b) => b.publishedAtTime - a.publishedAtTime)
        .slice(0, 8)
  }
}
