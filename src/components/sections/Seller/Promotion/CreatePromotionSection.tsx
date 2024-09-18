'use client'
import { useEffect, useState } from 'react'
import SelectPromotion from './SelectPromotion'
import { IPromoType, ISeller } from '#types/index'
import PercentageForm from './PromotionForms/PercentageForm'
import { sellerGetByIdPopulateProducts } from '#backend/actions/sellerActions'
import BuyXGetYForm from './PromotionForms/BuyXGetYForm'
import CountAndPercentageForm from './PromotionForms/CountAndPercent'

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
      <div className="flex h-full w-full gap-2 p-14">
         <div className="w-[35%]">
            {seller ? <SelectPromotion setValue={setPromoType} placeholder="Select promotion type" /> : 'Loading...'}
         </div>
         <div className="w-[60%]">
            {promoType &&
               seller &&
               (promoType === 'percentage' ? (
                  <PercentageForm seller={seller} />
               ) : promoType === 'buyXgetY' ? (
                  <BuyXGetYForm seller={seller} />
               ) : promoType === 'fixed' ? (
                  <div>Fixed</div>
               ) : promoType === 'count&percentage' ? (
                  <CountAndPercentageForm seller={seller} />
               ) : (
                  promoType === 'freeShipping' && <div>Free Shipping</div>
               ))}
         </div>
      </div>
   )
}

export default CreatePromotionSection
