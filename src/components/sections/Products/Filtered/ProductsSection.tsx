import { productsGetByFilters } from '#backend/actions/productActions'
import { IFilter, IProduct } from '#types/index'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '#ui/breadcrumb'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#ui/carousel'
import Loading from '#ui/Loading'
import ProductCard from '#ui/Products/ProductCard'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ProductBread from '../ProductBread'

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

   return (
      <div className={`flex flex-col gap-4`}>
         <div className="text-md ml-2">
            <ProductBread category={filters.category} />
         </div>
         <div className={`grid w-full grid-cols-[repeat(auto-fit,minmax(240px,400px))] gap-2.5`}>
            {isLoading && <Loading />}
            {isError && <div>Error</div>}
            {data && data.map((product: IProduct) => <ProductCard key={product._id.toString()} product={product} />)}
         </div>
      </div>
   )
}

export default ProductsSection
