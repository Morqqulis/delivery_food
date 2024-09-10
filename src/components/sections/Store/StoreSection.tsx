'use client'
import { productGetAll } from '#backend/actions/productActions'
import { sellerGetByIdPopulateProducts } from '#backend/actions/sellerActions'
import { ISeller } from '#types/index'
import { useEffect, useState } from 'react'
import StoreTitle from './StoreTitle'
import ProductCard from '#ui/ProductCard'

const StoreSection: React.FC<{ id: string }> = ({ id }): JSX.Element => {
   const [store, setStore] = useState({} as ISeller)
   useEffect(() => {
      ;(async () => {
         await productGetAll()
         const seller = await sellerGetByIdPopulateProducts(id)
         setStore(seller)
      })()
   }, [])
   return (
      <section className={`py-20`}>
         <div className="container">
            {store.name ? (
               <div className="flex flex-col gap-4">
                  <StoreTitle store={store} />
                  <div className="flex flex-wrap gap-5">
                     {store.products?.length &&
                        store.products.map((product) => <ProductCard key={product._id.toString()} product={product} />)}
                  </div>
               </div>
            ) : (
               'Loading...'
            )}
         </div>
      </section>
   )
}

export default StoreSection
