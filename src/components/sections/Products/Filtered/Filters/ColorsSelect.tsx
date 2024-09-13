import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#ui/select'
import { IFilter } from '../FilteredPageSection'
import { allColors } from './static'

const ColorSelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>> }> = ({
   setFilters,
}): JSX.Element => {
   return (
      // <Select
      //    onValueChange={(value) =>
      //       setFilters((prev) => ({
      //          ...prev,
      //          color: value,
      //       }))
      //    }
      // >
      //    <SelectTrigger className="w-[180px] border-none bg-cake-200 outline-none">
      //       <SelectValue placeholder="Color" className="" />
      //    </SelectTrigger>
      //    <SelectContent>
      //       {allColors.map((color) => (
      //          <SelectItem
      //             value={color}
      //             key={color}
      //             className={`max-h-[250px] cursor-pointer focus:bg-cake-100 focus:text-cake-200`}
      //          >
      //             {color}
      //          </SelectItem>
      //       ))}
      //    </SelectContent>
      // </Select>
      <>COLOR</>
   )
}

export default ColorSelect
