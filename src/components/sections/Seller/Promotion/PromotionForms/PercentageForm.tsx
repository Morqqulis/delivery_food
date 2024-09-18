'use client'
import { promoCreate } from '#backend/actions/promotionActions'
import { ISeller } from '#types/index'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { percentageSchema } from '#schemes/scheme'
import ProductsPopover from './ProductsPopover'
import Btn from '#ui/Btn/Btn'
import { Types } from 'mongoose'

interface IPercentage {}

const PercentageForm: React.FC<{ seller: ISeller }> = ({ seller }): JSX.Element => {
   const { products } = seller
   const { register, handleSubmit, reset, setValue } = useForm({
      resolver: zodResolver(percentageSchema),
      defaultValues: {
         discountValue: 0,
         description: '',
         name: '',
         applicableProducts: [],
      },
   })

   const onSubmit = async (formValue: any) => {
      const { discountValue, name, description, applicableProducts } = formValue
      if (discountValue <= 0 || discountValue > 100 || applicableProducts.length === 0) return

      const promo = await promoCreate({
         seller: seller._id as Types.ObjectId,
         description,
         name,
         discountType: 'percentage',
         discountValue,
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
               Promotion Name{' '}
            </label>

            <input
               id="name"
               type="text"
               {...register('name')}
               className="w-[300px] rounded-lg p-2 text-black outline-none"
            />
         </div>
         <div className="flex gap-3">
            <label htmlFor="discountValue" className="flex w-[100px] items-center">
               Percentage Value
            </label>

            <input
               id="discountValue"
               type="number"
               {...register('discountValue')}
               className="w-[300px] rounded-lg p-2 text-black outline-none"
            />
         </div>
         <div className="flex gap-3">
            <label htmlFor="description" className="flex w-[100px] items-center">
               Promotion Description
            </label>

            <textarea
               rows={4}
               id="description"
               {...register('description')}
               className="w-[300px] rounded-lg p-2 text-black outline-none"
            />
         </div>
         <Btn text="Create" type="submit" className="mt-5 w-[412px] rounded-lg p-2 text-black outline-none" />
      </form>
   )
}

export default PercentageForm
