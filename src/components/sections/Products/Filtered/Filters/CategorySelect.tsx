import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#ui/select'
import { IFilter } from '../FilteredPageSection'
import { allCategories } from './static'

const CategorySelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>> }> = ({
   setFilters,
}): JSX.Element => {
   return (
      <Select
         onValueChange={(value) =>
            setFilters((prev) => ({
               ...prev,
               category: value,
            }))
         }
      >
         <SelectTrigger className="w-[180px] border-none bg-cake-200 outline-none">
            <SelectValue placeholder="Category" className="" />
         </SelectTrigger>
         <SelectContent>
            {allCategories.map((category) => (
               <SelectItem
                  value={category}
                  key={category}
                  className="max-h-[250px] cursor-pointer focus:bg-cake-100 focus:text-cake-200"
               >
                  {category}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default CategorySelect
