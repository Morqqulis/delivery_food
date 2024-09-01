'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductSchema } from '#schemes/scheme'
import { IAddProduct } from '#types/index'
import { AddProductDefault } from '#settings/defaultValues'
import Btn from '#ui/Btn/Btn'
import { Types } from 'mongoose'
import { productCreate } from '#backend/actions/productActions'
import { sellerCreate } from '#backend/actions/sellerActions'

const AddProduct: React.FC = () => {
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      reset,
   } = useForm<IAddProduct>({
      resolver: zodResolver(ProductSchema),
      defaultValues: AddProductDefault,
   })

   const onSubmit = (data: IAddProduct) => {
      const { name, description, price, category } = data

      ;(async () => {
         const product = {
            _id: new Types.ObjectId(),
            name: name,
            description: description,
            price: price,
            category: category,
            image: './qazan.svg',
            seller: new Types.ObjectId('66d024b4d14d9bc8e4366bd2'),
         }
         await productCreate(product)
         reset()
      })()
   }

   return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
         <div className="w-[80%] rounded-lg bg-gray-800 p-8 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-white">Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-wrap gap-6">
               <div className="col-span-1 w-[45%]">
                  <label className="text-sm font-medium text-gray-300">Name</label>
                  <input
                     {...register('name')}
                     type="text"
                     className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.name ? 'border-red-500' : ''}`}
                  />
               </div>

               <div className="col-span-1 w-[45%]">
                  <label className="text-sm font-medium text-gray-300">Price</label>
                  <input
                     {...register('price', { valueAsNumber: true })}
                     type="number"
                     className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.price ? 'border-red-500' : ''}`}
                  />
               </div>

               <div className="col-span-1 w-[45%]">
                  <label className="text-sm font-medium text-gray-300">Category</label>
                  <input
                     {...register('category')}
                     type="text"
                     className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.category ? 'border-red-500' : ''}`}
                  />
               </div>

               <div className="col-span-1 w-[45%]">
                  <label className="text-sm font-medium text-gray-300">Image (optional)</label>
                  <input
                     type="file"
                     accept="image/*"
                     onChange={(event) => {
                        const file = event.target.files?.[0]
                        if (file) {
                           setValue('image', file)
                        }
                     }}
                     className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.image ? 'border-red-500' : ''}`}
                  />
               </div>

               <div className="col-span-1 w-[45%]">
                  <label className="text-sm font-medium text-gray-300">Description</label>
                  <textarea
                     {...register('description')}
                     className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${errors.description ? 'border-red-500' : ''}`}
                     rows={4}
                  />
               </div>

               <div className="col-span-1 flex w-[45%] items-center justify-center">
                  <Btn ariaLabel="Add Product" type="submit" text="Add Product" className="w-full" />
               </div>
            </form>
         </div>
      </div>
   )
}

export default AddProduct
