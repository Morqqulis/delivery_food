import { allColors } from '#static/filters'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#ui/accordion'
import { IFilter } from '#types/index'

const ColorSelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>>; filters: IFilter }> = ({
   setFilters,
   filters,
}): JSX.Element => {
   return (
      <Accordion type="single" collapsible>
         <AccordionItem value="Color">
            <AccordionTrigger>
               Color
               <p className=" ml-2 text-[13px]">
                  {filters.color ? `/ ${filters.color}` : ''}
               </p>
            </AccordionTrigger>
            <AccordionContent>
               <Accordion type="single" collapsible>
                  {allColors.map((color) => (
                     <AccordionItem key={color} value={color} className="border-none px-3 py-1">
                        <p
                           className={`cursor-pointer ${color === filters.color && 'font-bold text-blue-700'}`}
                           onClick={() => {
                              setFilters((prev) => ({ ...prev, color: color === 'All' ? '' : color }))
                           }}
                        >
                           {color}
                        </p>
                     </AccordionItem>
                  ))}
               </Accordion>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}

export default ColorSelect
