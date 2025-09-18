import { GetCustomerQuery } from '@/shopify/types/graphql'

export type Order = NonNullable<
  NonNullable<GetCustomerQuery['customer']>['orders']['nodes'][number]
>

export type LineItem = Order['lineItems']['nodes'][number]
