import { IProduct } from '#types/index'
import { Popover, PopoverContent, PopoverTrigger } from '#ui/popover'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import '#styles/scrollbar.scss'

const ProductsPopover: React.FC<{ products: IProduct[]; setValue: any }> = ({ products, setValue }): JSX.Element => {
   const [prods, setprods] = useState<string[]>([])
   useEffect(() => {
      setValue('applicableProducts', prods)
   }, [prods])

   return (
      <Popover>
         <PopoverTrigger
            className={`mt-1 h-fit w-[300px] rounded-md border border-gray-700 bg-gray-900 p-2 text-white shadow-sm`}
         >
            Select
         </PopoverTrigger>
         <PopoverContent className="scrollbar-custom flex max-h-[250px] flex-col overflow-auto bg-slate-100">
            {products?.map(({ name, _id, price }) => (
               <div
                  key={_id.toString()}
                  className="flex h-[25px] cursor-pointer items-center gap-3 border-b border-gray-600 py-4 hover:bg-zinc-100"
                  onClick={() =>
                     setprods(() =>
                        prods.includes(_id.toString())
                           ? prods.filter((p) => p !== _id.toString())
                           : [...prods, _id.toString()],
                     )
                  }
               >
                  <p className="flex h-6 w-6 items-center justify-center">
                     {prods.includes(_id.toString()) && <Check color="green" />}
                  </p>
                  <p>
                     {name} - $ {price}
                  </p>
               </div>
            ))}
         </PopoverContent>
      </Popover>
   )
}

export default ProductsPopover
