import { productsGetByFilters } from '#backend/actions/productActions'
import { IFilter, IProduct } from '#types/index'
import ProductCard from '#ui/Products/ProductCard'
import { useEffect, useState } from 'react'

const ProductsSection: React.FC<{ filters: IFilter }> = ({ filters }): JSX.Element => {
   const [products, setProducts] = useState([] as IProduct[])
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      setLoading(true)
      const handler = setTimeout(async () => {
         const product = await productsGetByFilters(filters)
         setProducts(product)
         setLoading(false)
      }, 1000)
      return () => clearTimeout(handler)
   }, [filters])

   return (
      <div className="flex w-[73%] flex-wrap gap-5">
         {loading ? (
            <div>Loading...</div>
         ) : (
            products.map((product) => <ProductCard key={product._id.toString()} product={product} />)
         )}
      </div>
   )
}

export default ProductsSection
