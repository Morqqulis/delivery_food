'use client'
import { allCategories } from '#static/filters'
import { IAddProduct, IProduct } from '#types/index'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '#ui/select'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

interface ISelectCategory {}

const SelectCategory: React.FC<{ setValue: UseFormSetValue<IAddProduct> }> = ({ setValue }): JSX.Element => {
   return (
      <Select onValueChange={(value) => setValue('category', value)}>
         <SelectTrigger className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm`}>
            <SelectValue placeholder="Select" className="text-sm font-medium text-gray-300" />
         </SelectTrigger>
         <SelectContent className=" ">
            {Object.entries(allCategories).map(([main, mainValue]) => (
               <SelectGroup key={main}>
                  <SelectLabel>{main}</SelectLabel>
                  {Object.entries(mainValue).map(([sub, subValue]) => (
                     <SelectGroup key={sub}>
                        <SelectLabel>{sub}</SelectLabel>
                        {subValue.map((child) => (
                           <SelectItem
                              className="cursor-pointer"
                              key={main + sub + child}
                              value={main + '+' + sub + '+' + child}
                           >
                              {child}
                           </SelectItem>
                        ))}
                     </SelectGroup>
                  ))}
               </SelectGroup>
            ))}
         </SelectContent>
      </Select>
   )
}

export default SelectCategory
