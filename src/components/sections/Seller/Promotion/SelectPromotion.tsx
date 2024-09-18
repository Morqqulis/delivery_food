import { IPromotion, IPromoType } from '#types/index'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '#ui/select'

const SelectPromotion: React.FC<{
   setValue?: (value: IPromoType) => void
   promotions?: IPromotion[]
   placeholder: string
   setSelected?: (value: IPromotion) => void
}> = ({ setValue, promotions, placeholder, setSelected }): JSX.Element => {
   const promoTypes = [
      {
         type: 'percentage',
         description: 'Applies a discount as a percentage of the total price.',
         name: 'Percentage',
      },
      {
         type: 'fixed',
         description: 'Applies a fixed amount off the total price.',
         name: 'Fixed',
      },
      {
         type: 'buyXgetY',
         description: 'Offers a free product from the purchased items when a specific quantity is bought.',
         name: 'Buy X get Y',
      },
      {
         type: 'freeShipping',
         description: 'Waives all shipping fees for the order.',
         name: 'Free shipping',
      },
      {
         type: 'count&percentage',
         description: 'A percentage discount is applied based on the quantity of products purchased',
         name: 'Quantity-Based Percentage Discount',
      },
   ]
   return (
      <Select
         onValueChange={(value) => {
            placeholder === 'Select Promotion' &&
               setSelected &&
               setSelected(promotions?.find((promotion) => promotion.name === value) as IPromotion)

            placeholder === 'Select promotion type' && setValue && setValue(value as IPromoType)
         }}
      >
         <SelectTrigger className={`mt-1 w-[300px] rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm`}>
            <SelectValue placeholder={placeholder} className="text-sm font-medium text-gray-300" />
         </SelectTrigger>
         <SelectContent className=" ">
            {promotions
               ? promotions.map((promotion) => (
                    <SelectItem key={promotion.name} className="cursor-pointer" value={promotion.name}>
                       {promotion.name}
                    </SelectItem>
                 ))
               : promoTypes.map(({ type, description, name }) => (
                    <SelectItem key={type} className="flex cursor-pointer flex-col items-start gap-1" value={type}>
                       <p className="font-bold">{name}</p>
                       <p className="text-sm">{description}</p>
                    </SelectItem>
                 ))}
         </SelectContent>
      </Select>
   )
}

export default SelectPromotion
