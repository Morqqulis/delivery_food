interface IPriceSelect {}
import { allSize } from '#static/filters'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#ui/accordion'
import { IFilter } from '#types/index'

const PriceSelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>>; filters: IFilter }> = ({
   setFilters,
   filters,
}): JSX.Element => {
   return (
      <div className="flex w-full items-center gap-3 border-b-2 py-4">
         <h1>Price </h1>
         <input
            type="number"
            placeholder="min"
            className="w-[100px] rounded-lg bg-gray-800 p-2 text-white"
            onChange={(e) =>
               setFilters((prev: IFilter) => ({ ...prev, price: { ...prev.price,  min: e.target.value } }))
            }
         />
         -
         <input
            type="number"
            placeholder="max"
            className="w-[100px] rounded-lg bg-gray-800 p-2 text-white"
            onChange={(e) =>
               setFilters((prev: IFilter) => ({ ...prev, price: { ...prev.price, max: e.target.value } }))
            }
         />
      </div>
   )
}

export default PriceSelect
