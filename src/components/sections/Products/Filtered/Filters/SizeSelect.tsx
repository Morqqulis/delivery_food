import { allSize } from '#static/filters'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#ui/accordion'
import { IFilter } from '#types/index'

const SizeSelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>>; filters: IFilter }> = ({
   setFilters,
   filters,
}): JSX.Element => {
   return (
      <Accordion type="single" collapsible>
         <AccordionItem value="Size">
            <AccordionTrigger>
               Size <p className="text-[13px] ml-2">{filters.size ? `/ ${filters.size}` : ''}</p>
            </AccordionTrigger>
            <AccordionContent>
               <Accordion type="single" collapsible>
                  {allSize.map((size) => (
                     <AccordionItem key={size} value={size} className="border-none px-3 py-1">
                        <p
                           className={`cursor-pointer ${size === filters.size && 'font-bold text-blue-700'}`}
                           onClick={() => {
                              setFilters((prev) => ({ ...prev, size: size === 'All' ? '' : size }))
                           }}
                        >
                           {size}
                        </p>
                     </AccordionItem>
                  ))}
               </Accordion>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}

export default SizeSelect
