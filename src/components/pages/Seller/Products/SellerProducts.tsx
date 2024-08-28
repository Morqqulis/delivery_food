'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Pencil, Trash } from 'lucide-react'
import {  productDeleteById } from '#backend/actions/productActions'
import { ISeller } from '#types/index'
import { sellerGetById } from '#backend/actions/sellerActions'

const ProductPage: React.FC = () => {
   const [seller, setSeller] = useState<ISeller>()

   useEffect(() => {
      ;(async () => {
         const sel = await sellerGetById('66cf9ec6e996c60736959ed9', 'name category price')
         if (sel) {
            setSeller(sel)
         }
      })()
   }, [])

   const deleteProduct = async (id: string) => {
      const deleted = await productDeleteById(id,"66cf9ec6e996c60736959ed9")
      console.log(deleted);
   }

   return (
      <div className="h-screen w-full bg-gray-900 p-6 text-white">
         <h1 className="mb-6 text-3xl font-bold">Your Products</h1>
         <div className="flex flex-wrap gap-6">
            {seller &&
               seller?.products?.map((product) => (
                  <div
                     key={product._id}
                     className="flex w-[300px] items-center justify-center gap-4 rounded-lg bg-gray-800 p-4"
                  >
                     <div className="flex-shrink-0">
                        <Image src="/qazan.svg" alt={product?.name} width={50} height={50} />
                     </div>
                     <div className="flex-1">
                        <h2 className="text-lg font-semibold">{product?.name}</h2>
                        <p className="text-sm">
                           {product?.category} - ${product?.price}
                        </p>
                     </div>
                     <div className="flex flex-col gap-2">
                        <Pencil className="cursor-pointer text-blue-400 hover:text-blue-500" size={20} />
                        <Trash
                           onClick={() => deleteProduct(product?._id)}
                           className="cursor-pointer text-red-400 hover:text-red-500"
                           size={20}
                        />
                     </div>
                  </div>
               ))}
         </div>
      </div>
   )
}

export default ProductPage
