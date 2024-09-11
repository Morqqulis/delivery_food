'use client'
import { IProduct } from '#types/index'
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../../../styles/scrollbar.scss'
import ProductCard from '#ui/Products/ProductCard'
import { cookieGetLiked } from '#backend/actions/cookieLiked'
import { productsGetByIdsEtc } from '#backend/actions/productActions'
import { cookieGetRecently } from '#backend/actions/cookieRecently'

// export const revalidate = 0

const ProductsSlider: React.FC<{ title: string }> = ({ title }) => {
   // const res = await fetch('http://localhost:3000/api/products')
   // const products = await res.json()

   const [products, setProducts] = useState<IProduct[] | []>([])

   useEffect(() => {
      ;(async () => {
         if (title === 'all') {
            const res = await axios.get('http://localhost:3000/api/products')
            setProducts(res.data)
         }
         if (title==='liked') {
            const idsLiked = await cookieGetLiked()
            const res = await productsGetByIdsEtc(idsLiked)
            setProducts(res)
         }
         if (title==='recently') {
            const idsRecently = await cookieGetRecently()
            console.log(idsRecently)
            const res = await productsGetByIdsEtc(idsRecently)
            console.log(res)
            setProducts(res)
         }
      })()
   }, [])

   return (
      <div className="flex flex-col gap-[26px]">
         <div className="scrollbar-custom flex w-full gap-7 overflow-x-auto">
            {products.length === 0 && <p>Loading...</p>}
            {products.length > 0 &&
               products.map((product: IProduct) => <ProductCard key={product._id.toString()} product={product} />)}
         </div>
      </div>
   )
}

export default ProductsSlider
