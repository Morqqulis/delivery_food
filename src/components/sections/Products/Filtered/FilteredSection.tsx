import CategorySelect from '#sections/Products/Filtered/Filters/CategorySelect'
import ColorSelect from '#sections/Products/Filtered/Filters/ColorsSelect'
import SizeSelect from '#sections/Products/Filtered/Filters/SizeSelect'
import { IFilter } from '#types/index'
import PriceSelect from './Filters/PriceSelect'
import PromotionSelect from './Filters/PromotionSelect'

const FilteredSection: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>>; filters: IFilter }> = ({
   setFilters,
   filters,
}): JSX.Element => {
   
   return (
      <div className="flex min-w-[25%] flex-col gap-5 border-r-[1px] p-2">
         <PriceSelect setFilters={setFilters} filters={filters} />
         <CategorySelect setFilters={setFilters} filters={filters} />
         <SizeSelect setFilters={setFilters} filters={filters} />
         <ColorSelect setFilters={setFilters} filters={filters} />
         <PromotionSelect setFilters={setFilters} filters={filters} />
      </div>
   )
}

export default FilteredSection
