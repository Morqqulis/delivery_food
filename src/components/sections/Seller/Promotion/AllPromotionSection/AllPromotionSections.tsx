'use client'
import { promoDelete, promoGetWithSeller, promoUpdateStatus } from '#backend/actions/promotionActions'
import { IPromotion } from '#types/index'
import { useEffect, useState } from 'react'
import SelectPromotion from '../SelectPromotion'
import Btn from '#ui/Btn/Btn'
import { dateFormatter } from '../../../../../functions/helpers'
import PromotionItem from './PromotionItem'

const AllPromotionSections: React.FC = (): JSX.Element => {
   const [promotions, setPromotions] = useState<IPromotion[]>()
   const [selected, setSelected] = useState<IPromotion>()

   useEffect(() => {
      ;(async () => {
         const promos = await promoGetWithSeller('66d02490d14d9bc8e4366bd1')
         setPromotions(promos)
      })()
   }, [])

   const setStatus = async () => {
      if (!selected) return
      await promoUpdateStatus(selected._id, !selected.isActive)
      setPromotions(
         promotions?.map((promo) => {
            return promo._id === selected._id ? { ...promo, isActive: !promo.isActive } : promo
         }),
      )
      setSelected(promotions?.find((promo) => promo._id === selected._id))
   }
   const deletePromo = async () => {
      if (!selected) return
      await promoDelete(selected._id, selected.applicableProducts)
      setPromotions(promotions?.filter((promo) => promo._id !== selected._id))
      setSelected(undefined)
   }
   return (
      <div className="flex h-full w-full flex-col gap-5 py-2">
         <div className="">
            {promotions ? (
               promotions.length > 0 ? (
                  <SelectPromotion placeholder="Select Promotion" setSelected={setSelected} promotions={promotions} />
               ) : (
                  <>No Promotions</>
               )
            ) : (
               <>Loading...</>
            )}
         </div>
         <div className="h-full w-full">
            {selected && (
               <div className="flex w-[70%] flex-col gap-5 rounded-lg border p-5 shadow-lg">
                  <div className="flex flex-col gap-5">
                     <PromotionItem title="Name" value={selected?.name} />
                     <PromotionItem title="Description" value={selected?.description} />
                     <PromotionItem title="Type" value={selected?.discountType} />
                     <PromotionItem title="Active" value={selected?.isActive ? 'Active' : 'Passiv'} />
                     <PromotionItem title="Start Date" value={dateFormatter(selected?.startDate)} />
                     <PromotionItem title="Value" value={selected?.discountValue} />
                     <PromotionItem title="Minimum Count" value={selected?.minimumOrderCount} />
                     <PromotionItem title="Get Y" value={selected?.getY} />
                     <PromotionItem title="Buy X" value={selected?.buyX} />
                     <PromotionItem
                        title="Products"
                        // @ts-ignore
                        value={selected?.applicableProducts.map((product) => product.name).join(', ')}
                     />
                  </div>
                  <div className="flex w-full gap-2">
                     <Btn
                        className="min-w-[200px]"
                        text={`Make it ${selected?.isActive ? 'Passiv' : 'Active'}`}
                        onClick={setStatus}
                     />
                     <Btn className="min-w-[200px]" text={`Delete `} onClick={deletePromo} />
                  </div>
               </div>
            )}

         </div>
      </div>
   )
}

export default AllPromotionSections
