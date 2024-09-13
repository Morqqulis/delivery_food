'use client'
import { IAddProduct } from '#types/index'
import { Popover, PopoverContent, PopoverTrigger } from '#ui/popover'
import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import '#styles/scrollbar.scss'
import { Check } from 'lucide-react'
import { allSize } from '#static/filters'

const SelectSize: React.FC<{ setValue: UseFormSetValue<IAddProduct> }> = ({ setValue }): JSX.Element => {
   const [selectedValues, setSelectedValues] = useState<string[]>([])

   const handleValueChange = (value: string) => {
      setSelectedValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))

      setValue('size', selectedValues)
   }
   return (
      <Popover>
         <PopoverTrigger
            className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 p-2 text-left text-white shadow-sm`}
         >
            Select
         </PopoverTrigger>
         <PopoverContent className="scrollbar-custom h-[250px] overflow-auto">
            {allSize.map((size) => (
               <div
                  key={size}
                  className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-700 hover:text-white"
                  onClick={() => handleValueChange(size)}
               >
                  <div className="flex h-6 w-6 items-center justify-center">
                     {selectedValues.includes(size) && <Check size={35} color="green" />}
                  </div>
                  <span className="ml-2">{size}</span>
               </div>
            ))}
         </PopoverContent>
      </Popover>
   )
}

export default SelectSize
