import { GetProductsQuery } from '@/shopify/types/graphql'

export const mockProduct: GetProductsQuery['products']['nodes'][0] = {
  id: 'gid://shopify/Product/1',
  title: 'iPhone 16 Pro',
  handle: 'iphone-16-pro',
  description: 'Apple flagship phone',
  publishedAt: '2025-01-01T00:00:00Z',
  tags: ['Apple', 'Phone'],

  category: {
    name: 'Smartphones',
  },

  images: {
    nodes: [
      {
        url: 'https://example.com/image-1.jpg',
        altText: 'Front View',
      },
    ],
  },

  variants: {
    edges: [
      {
        node: {
          id: 'gid://shopify/ProductVariant/1',

          // <-- GraphQL yêu cầu
          title: 'Default Title',

          price: {
            amount: '800',
            currencyCode: 'USD',
          },

          compareAtPrice: {
            amount: '1600',
            currencyCode: 'USD',
          },
        },
      },
    ],
  },
}
