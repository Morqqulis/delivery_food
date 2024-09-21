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
import AddFormLabel from './AddFormLabel'
import axios from 'axios'

const AddProduct: React.FC = () => {
   const form = useForm<IAddProduct>({
      resolver: zodResolver(ProductSchema),
      defaultValues: AddProductDefault,
   })

   const uploader = async (images: string[]) => {
      try {
         const res = await axios.post('/api/upload', { images: images })

         const { urls } = res.data
         if (urls.length === 0) return
         return urls
      } catch (error) {
         console.error('Error uploading images:', error)
      }
   }

   const onSubmit = (data: IAddProduct) => {
      const { name, description, price, category, colors, size, images } = data
      const [main, sub, child] = category.split('+')

      ;(async () => {
         const image = await uploader(images)
         if (image.length === 0, !name, !price, !category, !description) return 

         const product = {
            name,
            description,
            price: +price,
            attributes: {
               category: {
                  main,
                  sub,
                  child,
               },
               colors,
               size,
            },
            image,
            seller: new Types.ObjectId('66dacdf06c5dc6205ccfd518'),
         }
         await productCreate(product)
         form.reset()
      })()
   }

   return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
         <div className="w-[80%] rounded-lg bg-gray-800 p-8 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-white">Add Product</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-wrap gap-6">
               <AddFormLabel form={form} type="text" name="name" />
               <AddFormLabel form={form} type="number" name="price" />
               <AddFormLabel form={form} type="category" name="category" />
               <AddFormLabel form={form} type="color" name="colors" />
               <AddFormLabel form={form} type="size" name="size" />
               <AddFormLabel form={form} type="file" name="images" />
               <AddFormLabel form={form} type="textarea" name="description" rows={4} />

               <div className="col-span-1 flex w-[45%] items-center justify-center">
                  <Btn ariaLabel="Add Product" type="submit" text="Add Product" className="w-full" />
               </div>
            </form>
         </div>
      </div>
   )
}

export default AddProduct
