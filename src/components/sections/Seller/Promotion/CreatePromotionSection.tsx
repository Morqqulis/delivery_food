'use client'
import { useEffect, useState } from 'react'
import SelectPromotion from './SelectPromotion'
import { IPromoType, ISeller } from '#types/index'
import PercentageForm from './PromotionForms/PercentageForm'
import { sellerGetByIdPopulateProducts, sellerGetProductsWithSelect } from '#backend/actions/sellerActions'
import BuyXGetYForm from './PromotionForms/BuyXGetYForm'

const CreatePromotionSection: React.FC = (): JSX.Element => {
   const [promoType, setPromoType] = useState<IPromoType>()
   const [seller, setSeller] = useState<ISeller>()

   useEffect(() => {
      ;(async () => {
         const sel = await sellerGetByIdPopulateProducts('66d02490d14d9bc8e4366bd1')
         if (sel) {
            setSeller(sel)
         }
      })()
   }, [])

   return (
      <div className="flex h-screen w-full justify-center bg-gray-900 p-14">
         <div className="flex h-full w-full flex-col gap-2">
            {seller ? <SelectPromotion setValue={setPromoType} /> : 'Loading...'}
            {promoType &&
               seller &&
               (promoType === 'percentage' ? (
                  <PercentageForm seller={seller} />
               ) : promoType === 'buyXgetY' ? (
                  <BuyXGetYForm seller={seller} />
               ) : promoType === 'fixed' ? (
                  <div>Fixed</div>
               ) : (
                  promoType === 'freeShipping' && <div>Free Shipping</div>
               ))}
         </div>
      </div>
   )
}

export default CreatePromotionSection
