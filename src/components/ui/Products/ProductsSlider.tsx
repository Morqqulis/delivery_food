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

const ProductsSlider = ({ title, product }: { title: string; product?: IProduct }) => {
   const [products, setProducts] = useState<IProduct[] | []>([])

   const handleGetProducts = async (title: string = 'all') => {
      let res

      switch (title.toLowerCase()) {
         case 'all':
            res = await axios.get('http://localhost:3000/api/products')
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
            res = await axios.get('http://localhost:3000/api/products')
            break
      }

      title.toLowerCase() !== 'all' ? setProducts(res) : setProducts(res.data)

      return title.toLowerCase() !== 'all' ? res : res.data
   }

   const query = useQuery({
      queryKey: ['get products'],
      queryFn: () => handleGetProducts(title),
      initialData: products,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,

      staleTime: 1000 * 60 * 60,
   })

   // const res = await fetch('http://localhost:3000/api/products')
   // const products = await res.json()

   // useEffect(() => {
   //    handleGetProducts()
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
            {query.isError && <p>Error</p>}
            {query.isLoading && <p>Loading...</p>}
            {query.data?.map((product: IProduct) => <ProductCard key={product?._id?.toString()} product={product} />)}
         </div>
      </div>
   )
}

export default ProductsSlider
