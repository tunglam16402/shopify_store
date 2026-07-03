import { mappingDiscountPrice } from '@/lib/helper'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { mockProduct } from '../mocks'

describe('mappingDiscountPrice', () => {
  let result: ReturnType<typeof mappingDiscountPrice>

  beforeAll(() => {
    result = mappingDiscountPrice(mockProduct)
  })

  it('should calculate discount correctly', () => {
    expect(result.basePrice).toBe(800)

    expect(result.compareAtPrice).toBe(1600)

    expect(result.discountPercent).toBe(50)
  })
  beforeEach(() => {
    console.log('2')
  })

  it('should return 0 discount when compareAtPrice is null', () => {})
})
