import { IFilter } from '#types/index'

interface IPromotionSelect {
   setFilters: React.Dispatch<React.SetStateAction<IFilter>>
   filters: IFilter
}

const PromotionSelect: React.FC<IPromotionSelect> = ({ setFilters, filters }): JSX.Element => {
   return (
      <div className="flex w-full items-center gap-3 border-b-2 py-4">
         <input
            type="checkbox"
            onChange={(e) => setFilters((prev: IFilter) => ({ ...prev, promotion: e.target.checked }))}
            checked={filters.promotion || false}
         />{' '}
         Promotion
      </div>
   )
}

export default PromotionSelect
