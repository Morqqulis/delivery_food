'use client'
import { IProduct } from '#types/index'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from '../../ui/ProductCard'
import '../../../styles/scrollbar.scss'

// export const revalidate = 0

const HomeProducts = () => {
   // const res = await fetch('http://localhost:3000/api/products')
   // const products = await res.json()

   const [products, setProducts] = useState<IProduct[] | []>([])

   useEffect(() => {
      ;(async () => {
         const res = await axios.get('http://localhost:3000/api/products')
         setProducts(res.data)
      })()
   }, [])

   return (
      <div className="flex flex-col gap-[26px]">
         {products.length === 0 && <h2 className={`mx-auto text-center text-4xl text-tomato-200`}>Loading...</h2>}
         <div className="flex w-full gap-7 overflow-x-auto">
            {products.length > 0 &&
               products.map((product: IProduct) => <ProductCard key={product._id.toString()} product={product} />)}
         </div>
      </div>
   )
}

export default HomeProducts
