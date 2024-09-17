'use client'
import { promoCreate } from '#backend/actions/promotionActions'
import { ISeller } from '#types/index'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { buyXgetYSchema } from '#schemes/scheme'
import ProductsPopover from './ProductsPopover'
import Btn from '#ui/Btn/Btn'
import { Types } from 'mongoose'

const BuyXGetYForm: React.FC<{ seller: ISeller }> = ({ seller }): JSX.Element => {
   const { products } = seller

   const { register, handleSubmit, reset, setValue } = useForm({
      resolver: zodResolver(buyXgetYSchema),
      defaultValues: {
         description: '',
         name: '',
         applicableProducts: [],
         buyX: 1,
         getY: 1,
      },
   })

   const onSubmit = async (formValue: any) => {
      const { buyX, getY, name, description, applicableProducts } = formValue
      console.log(formValue)
      if (buyX <= 0 || getY <= 0 || applicableProducts.length === 0) return
      const promo = await promoCreate({
         seller: seller._id as Types.ObjectId,
         description,
         name,
         buyX,
         getY,
         discountType: 'buyXgetY',
         applicableProducts,
         startDate: new Date(),
         // endsDate: new Date(),
         isActive: true,
      })
      if (promo) {
         reset()
      }
   }

   return (
      <form
         className="flex h-full w-full flex-col items-center justify-center gap-2 p-5"
         onSubmit={handleSubmit(onSubmit)}
      >
         <div className="flex gap-3">
            <label htmlFor="" className="flex w-[100px] items-center">
               Products:
            </label>
            <ProductsPopover products={products} setValue={setValue} />
         </div>
         <div className="flex gap-3">
            <label htmlFor="name" className="flex w-[100px] items-center">
               Promotion Name:
            </label>
            <input
               id="name"
               type="text"
               {...register('name')}
               className="w-[300px] rounded-lg p-2 text-black outline-none"
            />
         </div>
         <div className="flex gap-3">
            <label htmlFor="buyX" className="flex w-[100px] items-center">
               Bux X:
            </label>
            <input
               id="buyX"
               type="number"
               {...register('buyX')}
               className="w-[300px] rounded-lg p-2 text-black outline-none"
            />
         </div>
         <div className="flex gap-3">
            <label htmlFor="getY" className="flex w-[100px] items-center">
               Get Y:
            </label>

            <input
               id="getY"
               type="number"
               {...register('getY')}
               className="w-[300px] rounded-lg p-2 text-black outline-none"
            />
         </div>
         <div className="flex gap-3">
            <label htmlFor="description" className="flex w-[100px] items-center">
               Promotion Description:
            </label>
            <textarea
               id="description"
               rows={4}
               {...register('description')}
               className="w-[300px] rounded-lg p-2 text-black outline-none"
            />
         </div>
         <Btn text="Create" type="submit" className="mt-5 w-[412px] rounded-lg p-2 text-black outline-none" />
      </form>
   )
}

export default BuyXGetYForm
