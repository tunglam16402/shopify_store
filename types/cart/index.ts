export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: { amount: number; currencyCode: string }
    compareAtPrice?: { amount: number; currencyCode: string } | null
    image?: { url: string; altText: string } | null
    product: { title: string; totalInventory: number }
  }
}

export type Cart = {
  id: string
  createdAt: string
  updatedAt: string
  checkoutUrl: string
  lines: CartLine[]
  cost: {
    totalAmount: { amount: number; currencyCode: string }
    subtotalAmount: { amount: number; currencyCode: string }
  }
}
