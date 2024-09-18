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
                     {/* <PromotionItem title="Products" value={selected?.applicableProducts} /> */}
                     <PromotionItem title="Active" value={selected?.isActive ? 'Active' : 'Passiv'} />
                     {/* <PromotionItem title="Start Date" value={dateFormatter(selected?.startDate).toString()} /> */}
                     {selected?.discountValue && selected?.discountValue > 0 ? (
                        <div className="flex gap-3">
                           <p className="flex w-[100px] items-center">Value: </p>

                           <p> {selected?.discountValue}</p>
                        </div>
                     ) : (
                        ''
                     )}
                     {selected?.minimumOrderCount && selected?.minimumOrderCount > 0 ? (
                        <div className="flex gap-3">
                           <p className="flex w-[100px] items-center">Minimum Count: </p>

                           <p> {selected?.minimumOrderCount}</p>
                        </div>
                     ) : (
                        ''
                     )}
                     {selected?.getY && selected?.getY > 0 ? (
                        <div className="flex gap-3">
                           <p className="flex w-[100px] items-center">Get Y: </p>
                           <p> {selected?.getY}</p>
                        </div>
                     ) : (
                        ''
                     )}
                     {selected?.buyX && selected?.buyX > 0 ? (
                        <div className="flex gap-3">
                           <p className="flex w-[100px] items-center">Buy X: </p>
                           <p> {selected?.buyX}</p>
                        </div>
                     ) : (
                        ''
                     )}
                     {selected?.applicableProducts?.length > 0 ? (
                        <div className="flex gap-3">
                           <p className="flex w-[100px] items-center">Products: </p>
                           {/* @ts-ignore */}
                           <p> {selected?.applicableProducts.map((product) => product.name).join(', ')}</p>
                        </div>
                     ) : (
                        ''
                     )}
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

            {/* <p>{selected?.applicableProducts}</p>
            <p>{selected?.applicableCategories}</p>
            <p>{selected?.endDate}</p>
            <p>{selected?.createdAt}</p>
            <p>{selected?.updatedAt}</p>
            <p>{selected?._id}</p> */}
         </div>
      </div>
   )
}

export default AllPromotionSections
