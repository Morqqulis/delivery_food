'use client'
import { orderCreate } from '#backend/actions/orderAction'
import { checkoutSchema } from '#schemes/scheme'
import { IBasket } from '#types/index'
import Btn from '#ui/Btn/Btn'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '#ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface CheckoutFormProps {
   basket: IBasket[]
   setBasket: React.Dispatch<React.SetStateAction<IBasket[]>>
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({ basket, setBasket }): JSX.Element => {
   const [deliveryType, setDeliveryType] = useState('')
   const [deliveryPoint, setDeliveryPoint] = useState('')
   const session = useSession()
   console.log(session)
   const { register, handleSubmit } = useForm({
      resolver: zodResolver(checkoutSchema),
   })

   const onSubmit = (data: any) => {
      console.log(data)
   }

   const getCheckout = async () => {
      // await orderCreate(basket, '66cf65fb10760b3633230284')
      setBasket([])
   }
   return session?.status === 'authenticated' ? (
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
                  <div className="last: flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="deliveryType" className="w-[25%] text-white">
                        Delivery Type
                     </label>
                     <select
                        id="deliveryType"
                        {...register('deliveryType')}
                        className="w-[60%] rounded border bg-[#16213e] p-2"
                        onChange={(e) => setDeliveryType(e.target.value)}
                     >
                        <option value="" disabled selected className="text-white">
                           Choose
                        </option>
                        <option value="standart" className="text-white">
                           Standart
                        </option>
                        <option value="address" className="text-white">
                           Address
                        </option>
                     </select>
                  </div>
                  {deliveryType === 'standart' ? (
                     <div className="flex w-[45%] items-center gap-2 p-2">
                        <label htmlFor="deliveryPoint" className="w-[25%] text-white">
                           Choose a delivery point near you{' '}
                        </label>
                        <select
                           id="deliveryPoint"
                           {...register('deliveryPoint')}
                           className="w-[60%] rounded border bg-[#16213e] p-2"
                           onChange={(e) => setDeliveryPoint(e.target.value)}
                        >
                           <option className="text-white" value="" disabled selected>
                              Choose
                           </option>
                           <option className="text-white" value="Nərimanov rayonu">
                              Nərimanov
                           </option>
                           <option className="text-white" value="Yasamal rayonu">
                              Yasamal
                           </option>
                           <option className="text-white" value="Sabunçu rayonu">
                              Sabunçu
                           </option>
                        </select>
                     </div>
                  ) : (
                     ''
                  )}

                  {deliveryType && (
                     <>
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
                           <label htmlFor="phone " className="w-[25%] text-white">
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
                        {deliveryType === 'address' && (
                           <>
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
                           </>
                        )}
                        <div className="flex w-[45%] items-center gap-2 p-2">
                           <label htmlFor="note" className="w-[25%] text-white">
                              Notes for seller or delivery
                           </label>
                           <textarea
                              id="city"
                              {...register('note')}
                              rows={5}
                              className="w-[60%] rounded border p-2 text-[#16213e]"
                           />
                        </div>
                     </>
                  )}
                  <Btn ariaLabel="submit" type="submit" className="btn btn-primary" text="Submit" />
               </form>
            </SheetHeader>
         </SheetContent>
      </Sheet>
   ) : (
      <Link
         href={'/auth'}
         className="flex w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-[.3125rem] bg-tomato-100 px-6 py-3 text-base font-medium leading-[1.5rem] text-white transition-all duration-300 ease-in hover:scale-105 hover:bg-mini-100 hover:text-dark-900"
      >
         Checkout Complete
      </Link>
   )
}

export default CheckoutForm
