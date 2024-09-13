import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '#ui/select'

const Options: React.FC<{ title: string; options: string[] }> = ({ title, options }): JSX.Element => {
   return (
      <Select>
         <SelectTrigger className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm`}>
            <SelectValue placeholder={title} className="text-sm font-medium text-gray-300" />
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
