'use client'
import { cookieGetLiked } from '#backend/actions/cookieLiked'
import { cookieGetRecently } from '#backend/actions/cookieRecently'
import { productRelatedNameAndCategory, productsGetByIdsEtc } from '#backend/actions/productActions'
import { IProduct } from '#types/index'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#ui/carousel'
import ProductCard from '#ui/Products/ProductCard'
import { GlowCapture } from '@codaworks/react-glow'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import '../../../styles/scrollbar.scss'

const ProductsSlider = ({ title = 'all', product }: { title: string; product?: IProduct }) => {
   const { data, isLoading, isError } = useQuery({
      queryKey: ['get products'],
      queryFn: () => handleGetProducts(title),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,

      staleTime: 1000 * 60 * 60, // 1 Saat
   })

   async function handleGetProducts(title: string = 'all') {
      let res

      switch (title.toLowerCase()) {
         case 'all':
            res = await axios.get('/api/products')
            break
         case 'liked':
            res = await productsGetByIdsEtc(await cookieGetLiked())
            break
         case 'recently':
            res = await productsGetByIdsEtc(await cookieGetRecently())

         case 'related':
            if (!product) return
            res = await productRelatedNameAndCategory(product)
         default:
            res = await axios.get('/api/products')
            break
      }

      return title.toLowerCase() !== 'all' ? res : (res.data as IProduct[])
   }

   return (
      <div className="container flex w-full flex-col gap-[26px]">
         <div className="scrollbar-custom flex w-full items-center gap-7">
            {isError && <h2 className={`mt-20 w-full text-center text-3xl text-tomato-200`}>Error</h2>}
            {isLoading && <h2 className={`mt-20 w-full text-center text-3xl text-tomato-200`}>Loading...</h2>}
            {data?.length > 0 && (
               <Carousel className={`mx-auto w-full max-w-[1200px]`} color={'red'}>
                  <CarouselContent className={``}>
                     {data?.map((product: IProduct) => (
                        <CarouselItem className={`basis-1/4`} key={product?._id?.toString()}>
                           
                              <ProductCard product={product} />
                           
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
               </Carousel>
            )}
         </div>
      </div>
   )
}

export default ProductsSlider
