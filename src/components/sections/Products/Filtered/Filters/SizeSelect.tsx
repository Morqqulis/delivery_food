import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#ui/select'
import { IFilter } from '../FilteredPageSection'
import { allSize } from './static'

const SizeSelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>>}> = ({ setFilters }): JSX.Element => {
   return (
      <>SIZE</>
      // <Select  onValueChange={(value) =>
      //    setFilters((prev) => ({
      //       ...prev,
      //       size: value,
      //    }))}>
      //    <SelectTrigger className="w-[180px] border-none bg-cake-200 outline-none">
      //       <SelectValue placeholder="Size" className="" />
      //    </SelectTrigger>
      //    <SelectContent>
      //       {allSize.map((size) => (
      //          <SelectItem
      //             value={size}
      //             key={size}
      //             className="max-h-[250px] cursor-pointer focus:bg-cake-100 focus:text-cake-200"
      //          >
      //             {size}
      //          </SelectItem>
      //       ))}
      //    </SelectContent>
      // </Select>
   )
}

export default SizeSelect
