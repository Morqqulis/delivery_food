'use client'
import { IProduct } from '#types/index'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import '../../../styles/scrollbar.scss'
import ProductCard from '#ui/Products/ProductCard'
import { cookieGetLiked } from '#backend/actions/cookieLiked'
import { productRelatedNameAndCategory, productsGetByIdsEtc } from '#backend/actions/productActions'
import { cookieGetRecently } from '#backend/actions/cookieRecently'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// export const revalidate = 0

const ProductsSlider = ({ title = 'all', product }: { title: string; product?: IProduct }) => {
   // const [products, setProducts] = useState<IProduct[] | []>([])

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

      // title.toLowerCase() !== 'all' ? setProducts(res) : setProducts(res.data)

      return title.toLowerCase() !== 'all' ? res : (res.data as IProduct[])
   }

   // const res = await fetch('http://localhost:3000/api/products')
   // const products = await res.json()

   // useEffect(() => {
   // handleGetProducts()
   //    ;(async () => {
   //       if (title === 'all') {
   //          const res = await axios.get('http://localhost:3000/api/products')
   //          setProducts(res.data)
   //       }
   //       if (title === 'liked') {
   //          const idsLiked = await cookieGetLiked()
   //          const res = await productsGetByIdsEtc(idsLiked)
   //          setProducts(res)
   //       }
   //       if (title === 'recently') {
   //          const idsRecently = await cookieGetRecently()
   //          const res = await productsGetByIdsEtc(idsRecently)
   //          setProducts(res)
   //       }
   //       if (title === 'related') {
   //          if (!product) return
   //          const res = await productRelatedNameAndCategory(product)
   //          setProducts(res)
   //       }
   //    })()
   // }, [])

   return (
      <div className="flex w-full flex-col gap-[26px]">
         <div className="scrollbar-custom flex w-full items-center gap-7 overflow-x-auto">
            {isError && <h2 className={`mt-20 text-center text-3xl text-tomato-200 w-full`}>Error</h2>}
            {isLoading && <h2 className={`mt-20 text-center text-3xl text-tomato-200 w-full`}>Loading...</h2>}
            {data?.map((product: IProduct) => <ProductCard key={product?._id?.toString()} product={product} />)}
         </div>
      </div>
   )
}

export default ProductsSlider
