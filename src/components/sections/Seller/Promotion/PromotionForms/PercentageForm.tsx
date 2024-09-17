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
      console.log(formValue)
      if (
         discountValue <= 0 ||
         discountValue > 100 ||
         applicableProducts.length === 0
      )
         return

      const promo = await promoCreate({
         seller: seller._id as Types.ObjectId,
         description: formValue.description,
         name: formValue.name,
         discountType: 'percentage',
         discountValue: formValue.discountValue,
         applicableProducts: formValue.applicableProducts,
         startDate: new Date(),
         // endsDate: new Date(),
         isActive: true,
      })
      console.log(promo)
      if (promo) {
         reset()
      }
   }

   return (
      <form
         className="flex h-full w-full flex-col items-center justify-center gap-2 p-5"
         onSubmit={handleSubmit(onSubmit)}
      >
         <ProductsPopover products={products} setValue={setValue} />
         <input
            type="text"
            {...register('name')}
            className="w-[300px] rounded-lg p-2 text-black outline-none"
            placeholder="Promotion Name"
         />
         <input
            type="number"
            {...register('discountValue')}
            className="w-[300px] rounded-lg p-2 text-black outline-none"
            placeholder="Percentage value"
         />
         <textarea
            rows={4}
            {...register('description')}
            className="w-[300px] rounded-lg p-2 text-black outline-none"
            placeholder="Promotion Description"
         />
         <Btn text="Create" type="submit" className="w-[300px] rounded-lg p-2 text-black outline-none" />
      </form>
   )
}

export default PercentageForm
