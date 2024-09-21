import { IPromotion } from '#types/index'

interface IBasketDiscountSection {}

const BasketDiscountSection: React.FC<{ promotions: IPromotion }> = ({ promotions }): JSX.Element => {
   return (
      <p className='text-red-500 text-[15px] mt-2'>
         Bu məhsulda{' '}
         {promotions?.discountType === 'buyXgetY' && promotions?.buyX && promotions?.getY
            ? `${promotions?.buyX + promotions?.getY} al ${promotions?.buyX} ödə `
            : promotions?.discountType === 'count&percentage'
              ? promotions.discountValue &&
                promotions.minimumOrderCount &&
                `minimum ${promotions.minimumOrderCount} ədəd al ${promotions?.discountValue}% endirim qazan `
              : promotions.discountType === 'percentage' &&
                promotions.discountValue &&
                `${promotions.discountValue}% endirim `}
         aksiyası var
      </p>
   )
}

export default BasketDiscountSection
