import CategorySelect from '#sections/Products/Filtered/Filters/CategorySelect'
import ColorSelect from '#sections/Products/Filtered/Filters/ColorsSelect'
import SizeSelect from '#sections/Products/Filtered/Filters/SizeSelect'
import { IFilter } from './FilteredPageSection'

const FilteredSection: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>> }> = ({
   setFilters,
}): JSX.Element => {
   return (
      <div className="flex min-w-[25%] flex-col gap-5 border-r-[1px] p-2">
         <CategorySelect setFilters={setFilters} />
         <SizeSelect setFilters={setFilters} />
         <ColorSelect setFilters={setFilters} />
      </div>
   )
}

export default FilteredSection
