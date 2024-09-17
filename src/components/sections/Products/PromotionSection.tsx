import { IPromotion } from '#types/index'

interface IPromotionSection {}

const PromotionSection: React.FC<{ promotions: IPromotion }> = ({ promotions }): JSX.Element => {
   return (
      <div className="flex gap-2 border-b-[0.3px] border-gray-400 py-4">
         {promotions.discountType === 'percentage' && (
            <div>
               <p>Get {promotions?.discountValue}% off on this product!</p>
               <p>
                  {promotions?.name} {promotions?.description}
               </p>
            </div>
         )}
      </div>
   )
}

export default PromotionSection
