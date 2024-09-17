import { IPromoType } from '#types/index'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '#ui/select'

const SelectPromotion: React.FC<{
   setValue: (value: IPromoType) => void
}> = ({ setValue }): JSX.Element => {
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
   ]

   return (
      <Select onValueChange={setValue}>
         <SelectTrigger className={`mt-1 w-[300px] rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm`}>
            <SelectValue placeholder="Select promotion type" className="text-sm font-medium text-gray-300" />
         </SelectTrigger>
         <SelectContent className=" ">
            {promoTypes.map(({ type, description, name }) => (
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
