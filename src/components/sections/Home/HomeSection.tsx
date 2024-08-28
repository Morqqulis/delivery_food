'use client'
import axios from 'axios'
import ProductsSection from './ProductsSection'
import { useEffect, useState } from 'react'
import { productGetAll } from '#backend/actions/productActions'

export const revalidate = 0

const HomeSection: React.FC = (): JSX.Element => {
   const [data, setData] = useState<any>([])
   // const result = await axios.get('http://localhost:3000/api/products')
   // const serialisedResult = JSON.parse(JSON.stringify(await result.data))
   useEffect(() => {
      ;(async () => {
         const data = await productGetAll()
         setData(data)
      })()
   }, [])

   return (
      <div className="container flex flex-col gap-10">
         <ProductsSection title={'New Products'} products={data} />
      </div>
   )
}

export default HomeSection
