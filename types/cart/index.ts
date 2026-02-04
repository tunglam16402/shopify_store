export type CartLine = {
  id: string
  quantity: number
  attributes?: {
    key: string
    value: string
  }[]
  merchandise: {
    id: string
    title: string
    price: { amount: number; currencyCode: string }
    compareAtPrice?: { amount: number; currencyCode: string } | null
    image?: { url: string; altText: string } | null
    product: {
      id: string
      title: string
      handle: string
      totalInventory: number
      category: { name: string }
    }
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

export interface CartSubTotal {
  amount: number
  currencyCode: string
}

export interface CartDisplayItem {
  line: CartLine
  displayPrice: number
  displayComparedAtPrice?: number
}
