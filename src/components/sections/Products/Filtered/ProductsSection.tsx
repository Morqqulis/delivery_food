import { productsGetByFilters } from '#backend/actions/productActions'
import { IFilter, IProduct } from '#types/index'
import ProductCard from '#ui/Products/ProductCard'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const ProductsSection: React.FC<{ filters: IFilter }> = ({ filters }): JSX.Element => {
   const { isLoading, isError, data } = useQuery({
      queryKey: ['Filtered Products', filters],
      queryFn: async () => {
         return (await productsGetByFilters(filters)) as IProduct[]
      },
      enabled: !!filters,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 60,
   })

   // const [products, setProducts] = useState([] as IProduct[])
   // const [loading, setLoading] = useState(true)
   // useEffect(() => {
   //    setLoading(true)
   //    const handler = setTimeout(async () => {
   //       const product = await productsGetByFilters(filters)
   //       setProducts(product)
   //       setLoading(false)
   //    }, 1000)
   //    return () => clearTimeout(handler)
   // }, [filters])

   return (
      <div className="flex w-[73%] flex-wrap gap-5">
         {isLoading && <div>Loading...</div>}
         {isError && <div>Error</div>}
         {data && data.map((product: IProduct) => <ProductCard key={product._id.toString()} product={product} />)}
      </div>
   )
}

export default ProductsSection
