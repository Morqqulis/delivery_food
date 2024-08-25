'use client'
import { productGetAll } from '#backend/actions/productActions'
import { useEffect, useState } from 'react'
import ProductsSection from './ProductsSection'

const HomeSection: React.FC = (): JSX.Element => {
   const [data, setData] = useState<any>([])

   useEffect(() => {
      ;(async () => {
         const all = await productGetAll()
         setData(all)
      })()
   }, [])
   return (
      <div className="container flex flex-col gap-10">
         <ProductsSection title={'New Products'} products={data} />
         <ProductsSection title={'All Products'} products={data} />
      </div>
   )
}

export default HomeSection
