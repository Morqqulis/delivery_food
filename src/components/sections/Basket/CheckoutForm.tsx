'use client'
import { orderCreate } from '#backend/actions/orderAction'
import { checkoutSchema } from '#schemes/scheme'
import { CheckoutDefault } from '#settings/defaultValues'
import { useBasketStore } from '#stores/basketStore'
import { I0rderSeller, IBasket, ICheckoutForm } from '#types/index'
import Btn from '#ui/Btn/Btn'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '#ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { calculateTotal, getPrice } from '../../../functions/helpers'
import { productGetByIdWithPopulate } from '#backend/actions/productActions'
import { useEffect } from 'react'
import { sellerGetAll, sellerGetAllOrders } from '#backend/actions/sellerActions'

interface CheckoutFormProps {
   basket: IBasket[]
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ basket }) => {
   const session = useSession()
   const { clearBasket } = useBasketStore()
   const { register, handleSubmit, reset } = useForm({
      resolver: zodResolver(checkoutSchema),
      defaultValues: CheckoutDefault,
   })
   
   const onSubmit = async (form: ICheckoutForm) => {
      const user = {
         email: session?.data?.user?.email || '',
         name: session?.data?.user?.name || '',
      }

      await orderCreate(basket, user, form)
      reset()
      // clearBasket()
   }

   if (session.status !== 'authenticated') {
      return (
         <Link
            href={'/auth'}
            className="flex w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-[.3125rem] bg-tomato-100 px-6 py-3 text-base font-medium leading-[1.5rem] text-white transition-all duration-300 ease-in hover:scale-105 hover:bg-mini-100 hover:text-dark-900"
         >
            Checkout Complete
         </Link>
      )
   }

   return (
      <Sheet>
         <SheetTrigger className="flex w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-[.3125rem] bg-tomato-100 px-6 py-3 text-base font-medium leading-[1.5rem] text-white transition-all duration-300 ease-in hover:scale-105 hover:bg-mini-100 hover:text-dark-900">
            Checkout Complete
         </SheetTrigger>
         <SheetContent side={'top'} className="h-[80%] w-full overflow-auto border-none bg-[#16213e]">
            <SheetHeader>
               <SheetTitle className="w-full text-center text-white">
                  A form is required to complete the checkout
               </SheetTitle>
               <SheetDescription></SheetDescription>
               <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-wrap items-center gap-3">
                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="deliveryType" className="w-[25%] text-white">
                        Delivery Type
                     </label>
                     <select
                        id="deliveryType"
                        {...register('deliveryType')}
                        className="w-[60%] rounded border bg-[#16213e] p-2 text-white"
                     >
                        <option value="" disabled>
                           Choose
                        </option>
                        <option value="standart">Standard</option>
                        <option value="address">Address</option>
                     </select>
                  </div>

                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="fullName" className="w-[25%] text-white">
                        Full Name
                     </label>
                     <input
                        id="fullName"
                        type="text"
                        {...register('fullName')}
                        className="w-[60%] rounded border p-2 text-[#16213e]"
                     />
                  </div>
                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="phone" className="w-[25%] text-white">
                        Phone number
                     </label>
                     <input
                        id="phone"
                        type="tel"
                        defaultValue="+994"
                        {...register('phone')}
                        className="w-[60%] rounded border p-2 text-[#16213e]"
                     />
                  </div>

                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="city" className="w-[25%] text-white">
                        City
                     </label>
                     <input
                        id="city"
                        type="text"
                        {...register('city')}
                        className="w-[60%] rounded border p-2 text-[#16213e]"
                     />
                  </div>
                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="village" className="w-[25%] text-white">
                        Village
                     </label>
                     <input
                        id="village"
                        type="text"
                        {...register('village')}
                        className="w-[60%] rounded border p-2 text-[#16213e]"
                     />
                  </div>

                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="street" className="w-[25%] text-white">
                        Street
                     </label>
                     <input
                        id="street"
                        type="text"
                        {...register('street')}
                        className="w-[60%] rounded border p-2 text-[#16213e]"
                     />
                  </div>
                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="sellerNote" className="w-[25%] text-white">
                        Notes for seller
                     </label>
                     <textarea
                        id="sellerNote"
                        {...register('sellerNote')}
                        rows={5}
                        className="w-[60%] rounded border p-2 text-[#16213e]"
                     />
                  </div>
                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="deliveryNote" className="w-[25%] text-white">
                        Notes for Delivery (full address)
                     </label>
                     <textarea
                        id="deliveryNote"
                        {...register('deliveryNote')}
                        rows={5}
                        className="w-[60%] rounded border p-2 text-[#16213e]"
                     />
                  </div>
                  <Btn ariaLabel="submit" type="submit" className="btn btn-primary" text="Submit" />
               </form>
            </SheetHeader>
         </SheetContent>
      </Sheet>
   )
}

export default CheckoutForm
