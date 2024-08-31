'use client'
import { orderCreate } from '#backend/actions/orderAction'
import { checkoutSchema } from '#schemes/scheme'
import { IBasket } from '#types/index'
import Btn from '#ui/Btn/Btn'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '#ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const CheckoutForm: React.FC = (): JSX.Element => {
   const { register, handleSubmit } = useForm({
      resolver: zodResolver(checkoutSchema),
   })

   const onSubmit = (data: any) => {
      console.log(data)
   }

   return (
      <Sheet>
         <SheetTrigger className="flex w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-[.3125rem] bg-tomato-100 px-6 py-3 text-base font-medium leading-[1.5rem] text-white transition-all duration-300 ease-in hover:scale-105 hover:bg-mini-100 hover:text-dark-900">
            Checkout
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
                        Çatdırılma Növü
                     </label>
                     <select
                        id="deliveryType"
                        {...register('deliveryType')}
                        className="w-[60%] rounded border bg-[#16213e] p-2"
                     >
                        <option value="standart" className="text-white">
                           Standart
                        </option>
                        <option value="unvan" className="text-white">
                           Ünvana
                        </option>
                     </select>
                  </div>
                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="deliveryPoint" className="w-[25%] text-white">
                        Sizə yaxın çatdırılma nöqtəsi
                     </label>
                     <select
                        id="deliveryPoint"
                        {...register('deliveryPoint')}
                        className="w-[60%] rounded border bg-[#16213e] p-2"
                     >
                        <option className="text-white" value="Nərimanov rayonu">
                           Nərimanov rayonu
                        </option>
                        <option className="text-white" value="Yasamal rayonu">
                           Yasamal rayonu
                        </option>
                        <option className="text-white" value="Sabunçu rayonu">
                           Sabunçu rayonu
                        </option>
                     </select>
                  </div>
                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="name" className="w-[25%] text-white">
                        Ad
                     </label>
                     <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className="w-[60%] rounded border p-2 text-[#16213e]"
                     />
                  </div>
                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="phone " className="w-[25%] text-white">
                        Mobil Nömrə
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
                        Şəhər/Rayon
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
                        Küçə/mənzil
                     </label>
                     <input
                        id="street"
                        type="text"
                        {...register('street')}
                        className="w-[60%] rounded border p-2 text-[#16213e]"
                     />
                  </div>
                  <div className="flex w-[45%] items-center gap-2 p-2">
                     <label htmlFor="note" className="w-[25%] text-white">
                        Satıcı və ya çatdırılma üçün qeydlər
                     </label>
                     <textarea
                        id="city"
                        {...register('note')}
                        rows={5}
                        className="w-[60%] rounded border p-2 text-[#16213e]"
                     />
                  </div>
                  <Btn ariaLabel="submit" type="submit" className="btn btn-primary" text="Sifariş et" />
               </form>
            </SheetHeader>
         </SheetContent>
      </Sheet>
   )
}

export default CheckoutForm
