'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Pencil, Trash } from 'lucide-react'
import { productDeleteById, productGetAll, productUpdateById } from '#backend/actions/productActions'
import { IProduct, ISeller } from '#types/index'
import { sellerGetProductsWithSelect } from '#backend/actions/sellerActions'
import Btn from '#ui/Btn/Btn'

const ProductPage: React.FC = () => {
   const [products, setProducts] = useState([] as IProduct[])
   
   useEffect(() => {
      ;(async () => {
         await productGetAll()
         const { products } = await sellerGetProductsWithSelect(
            '66d02490d14d9bc8e4366bd1',
            'name attributes price isActive',
         )
         if (products) {
            setProducts(products)
         }
      })()
   }, [])

   const deleteProduct = async (id: string) => {
      await productDeleteById(id, '66d02490d14d9bc8e4366bd1')
   }

   const setActive = async (id: string) => {
      if (!id) return

      await productUpdateById(id, { isActive: !products.find((product) => product._id.toString() === id)?.isActive })

      setProducts(
         products.map((product) => {
            if (product._id.toString() === id) {
               return { ...product, isActive: !product.isActive }
            } else {
               return product
            }
         }),
      )
   }

   return (
      <div className="h-screen w-full bg-gray-900 p-6 text-white">
         <h1 className="mb-6 text-3xl font-bold">Your Products</h1>
         <div className="flex flex-wrap gap-6">
            {products?.map((product) => (
               <div
                  key={product._id.toString()}
                  className="flex min-w-[300px] flex-col items-center justify-center gap-4 rounded-lg bg-gray-800 p-4"
               >
                  <div className="flex w-full gap-4">
                     <div className="flex-shrink-0">
                        <Image src="/qazan.svg" alt={product?.name} width={50} height={50} />
                     </div>
                     <div className="flex-1">
                        <h2 className="text-lg font-semibold">{product?.name}</h2>
                        <p className="text-sm">
                           {product.attributes.category.child} - ${product?.price}
                        </p>
                     </div>
                  </div>

                  <div className="flex w-full gap-3 items-center">
                     <Pencil className="cursor-pointer text-blue-400 hover:text-blue-500" size={23} />
                     <Trash
                        onClick={() => deleteProduct(product?._id.toString())}
                        className="cursor-pointer text-red-400 hover:text-red-500"
                        size={23}
                     />
                     <Btn
                        text={`Set ${product.isActive ? 'Passiv' : 'Active'}`}
                        onClick={() => setActive(product._id.toString())}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default ProductPage
