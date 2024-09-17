import { productsGetByFilters } from '#backend/actions/productActions'
import { IFilter, IProduct } from '#types/index'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '#ui/breadcrumb'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#ui/carousel'
import Loading from '#ui/Loading'
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
      <div className={`flex flex-col gap-4`}>
         <p className="text-md ml-2">
            Categories{' '}
            {filters?.category?.child
               ? `/ ${filters.category.main} / ${filters.category.sub} / ${filters.category.child}`
               : filters?.category?.sub
                 ? `/ ${filters.category.main} / ${filters.category.sub}`
                 : filters?.category?.main
                   ? `/ ${filters.category.main}`
                   : ''}
         </p>
         <div className={`grid w-full grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2.5`}>
            {isLoading && <Loading />}
            {isError && <div>Error</div>}
            {data && data.map((product: IProduct) => <ProductCard key={product._id.toString()} product={product} />)}
         </div>
      </div>
   )
}

export default ProductsSection
