import { ISelectedAttributes } from '#types/index'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '#ui/select'

const Options: React.FC<{
   title: string
   options: string[]
   setSelectedAttributes: React.Dispatch<React.SetStateAction<ISelectedAttributes>>
}> = ({ title, options, setSelectedAttributes }): JSX.Element => {
   return (
      <Select
         onValueChange={(value) => setSelectedAttributes((prev: ISelectedAttributes) => ({ ...prev, [title]: value }))}
      >
         <SelectTrigger className={`mt-1 w-[150px] rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm`}>
            <SelectValue
               placeholder={title[0].toLocaleUpperCase() + title.slice(1)}
               className="text-sm font-medium text-gray-300"
            />
         </SelectTrigger>
         <SelectContent className=" ">
            {options.map((option) => (
               <SelectItem className="cursor-pointer" key={option} value={option}>
                  {option}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default Options
