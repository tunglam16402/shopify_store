import ProductCard, { ProductCardProps } from '../ProductCard'

type ProductListProps = {
  products: ProductCardProps['product'][]
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
