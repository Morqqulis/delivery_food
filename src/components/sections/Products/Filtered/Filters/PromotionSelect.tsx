import { IFilter } from '#types/index'
import { Label } from '#ui/label'

interface IPromotionSelect {
   setFilters: React.Dispatch<React.SetStateAction<IFilter>>
   filters: IFilter
}

const PromotionSelect: React.FC<IPromotionSelect> = ({ setFilters, filters }): JSX.Element => {
   return (
      <Label className={`flex w-full cursor-pointer items-center gap-3 border-b-2 py-4`}>
         <input
            type="checkbox"
            onChange={(e) => setFilters((prev: IFilter) => ({ ...prev, promotion: e.target.checked }))}
            checked={filters.promotion || false}
         />
         Promotion
      </Label>
   )
}

export default PromotionSelect
