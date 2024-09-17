import { IPromotion } from '#types/index'

const PromotionSection: React.FC<{ promotions: IPromotion }> = ({ promotions }): JSX.Element => {
   if (!promotions || !promotions.isActive) return <></>
   return (
      <div className="flex gap-2 border-b-[0.3px] border-gray-400 py-4">
         <div>
            {promotions.discountType === 'percentage' && <p>Get {promotions?.discountValue}% off on this product!</p>}
            {promotions.discountType === 'buyXgetY' && (
               <p>
                  Buy {promotions.buyX} for free {promotions.getY} on this product!
               </p>
            )}
            {/* {promotions.discountType === 'fixed' && <p>Get ${promotions?.discountValue} off on this product!</p>} */}
            <p>{promotions.description}</p>
         </div>
      </div>
   )
}

export default PromotionSection
