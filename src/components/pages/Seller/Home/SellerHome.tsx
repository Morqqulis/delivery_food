'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StoreSchema } from '#schemes/scheme'
import Btn from '#ui/Btn/Btn'
import { StoreValues } from '#settings/defaultValues'
import { IStoreFormValues } from '#types/index'

const SellerHome: React.FC = () => {
   const { register, handleSubmit } = useForm<IStoreFormValues>({
      resolver: zodResolver(StoreSchema),
      defaultValues: StoreValues,
   })

   const addStoreInformation = (data: IStoreFormValues) => {
      console.log(data)
   }

   return (
      <div className="flex items-center justify-center p-4 w-full h-screen">
         <div className="mx-auto flex w-[80%] flex-col rounded-lg bg-[#16213e] p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-white">Edit Store Information</h2>
            <form onSubmit={handleSubmit(addStoreInformation)} className="flex flex-wrap justify-between">
               <div className="mb-4 w-[45%]">
                  <label className="mb-2 block text-sm font-medium text-gray-300">Name</label>
                  <input
                     {...register('name')}
                     type="text"
                     className="w-full rounded border border-gray-600 bg-[#0f3460] p-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                     placeholder="Enter store name"
                  />
               </div>

               <div className="mb-4 w-[45%]">
                  <label className="mb-2 block text-sm font-medium text-gray-300">Second Name</label>
                  <input
                     {...register('secondName')}
                     type="text"
                     className="w-full rounded border border-gray-600 bg-[#0f3460] p-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                     placeholder="Enter store second name"
                  />
               </div>

               <div className="mb-4 w-[45%]">
                  <label className="mb-2 block text-sm font-medium text-gray-300">Address</label>
                  <input
                     {...register('address')}
                     type="text"
                     className="w-full rounded border border-gray-600 bg-[#0f3460] p-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                     placeholder="Enter store address"
                  />
               </div>

               <div className="mb-4 w-[45%]">
                  <label className="mb-2 block text-sm font-medium text-gray-300">Phone</label>
                  <input
                     {...register('phone')}
                     type="text"
                     className="w-full rounded border border-gray-600 bg-[#0f3460] p-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                     placeholder="Phone number"
                  />
               </div>

               <div className="mb-4 w-[45%]">
                  <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
                  <input
                     {...register('email')}
                     type="email"
                     className="w-full rounded border border-gray-600 bg-[#0f3460] p-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                     placeholder="Enter email address"
                  />
               </div>

               <div className="mb-4 w-[45%]">
                  <label className="mb-2 block text-sm font-medium text-gray-300">Photo</label>
                  <input
                     {...register('image')}
                     type="file"
                     className="w-full rounded border border-gray-600 bg-[#0f3460] p-2 text-gray-300 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
               </div>

               <Btn
                  text={'Submit'}
                  className="mt-5 w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  ariaLabel="submit button"
               />
            </form>
         </div>
      </div>
   )
}

export default SellerHome
