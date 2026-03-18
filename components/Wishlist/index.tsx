'use client'

import { useWishList } from '@/lib/hooks/useWishlist'
import { getProductsByIds } from '@/shopify/api/operations/get-product'
import { RootState } from '@/store/store'
import { ProductCardProps } from '@/types/product/productCard'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductListSkeleton from '../collection/CollectionSkeleton/ProductListSkeleton'
import { ProductList } from '../products'
import { Button } from '../ui/Button'
import Link from 'next/link'
import { IcoEmptyBox } from '../icons'

const Wishlist = () => {
  const { wishlistSet, loading, toggleWishlist } = useWishList()
  const [products, setProducts] = useState<ProductCardProps[]>([])
  const { customer } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!wishlistSet?.size || loading) {
      return
    }
    const productIds = Array.from(wishlistSet)
    async function fetchProducts() {
      try {
        const res = await getProductsByIds(productIds)
        const { validProducts } = res.reduce(
          (data, current, index) => {
            if (!current) {
              toggleWishlist({ productId: productIds[index], liked: false })
              return data
            }
            data.validProducts.push(current)
            return data
          },
          {
            validProducts: [] as ProductCardProps[],
          }
        )
        setProducts(validProducts)
      } catch (error) {}
    }
    fetchProducts()
  }, [loading])

  const hasWishlist = !!wishlistSet?.size
  const isWaitingProducts =
    !loading && !!wishlistSet?.size && products.length === 0

  return (
    <>
      {customer === null && !loading && (
        <div className="mt-5 md:mt-7">
          <div className="rounded-lg bg-[#F1F1F1] py-4 text-center text-sm md:text-base">
            <div className="layout-width items-center justify-between md:flex">
              <div>
                <span className="inline-block text-left">
                  Log in or register so you can save these items and see them on
                  any device.
                </span>
              </div>
              <div className="mt-3 flex gap-4 md:mt-0 md:justify-center md:gap-8">
                <Link href="account/login" className="flex-1 md:flex-none">
                  <Button
                    className="w-full rounded-md py-6 text-base md:px-24 md:text-lg"
                    variant="primary"
                  >
                    LOGIN
                  </Button>
                </Link>

                <Link href="account/register" className="flex-1 md:flex-none">
                  <Button
                    className="w-full rounded-md py-6 text-base md:px-24 md:text-lg"
                    variant="primary"
                  >
                    REGISTER
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="layout-width mt-9! md:mt-11!">
        {loading || isWaitingProducts ? (
          <ProductListSkeleton />
        ) : hasWishlist ? (
          <ProductList products={products} />
        ) : (
          <div className="relative my-24 flex flex-col items-center text-center">
            <div className="relative">
              <IcoEmptyBox className="h-48 w-48" />
            </div>

            <h2 className="up mt-8 text-3xl font-bold tracking-tight">
              Your wishlist feels lonely
            </h2>

            {/* Description */}
            <p className="text-muted-foreground mt-4 max-w-md text-sm md:mt-6 md:text-base">
              You haven’t saved any products yet. Find something you love and
              keep it close
            </p>

            <Button
              variant={'primary'}
              className="mt-6 rounded-md px-10 py-6 text-lg"
            >
              Discover products
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default Wishlist
