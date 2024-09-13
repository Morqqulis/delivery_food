import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#ui/accordion'
import { IFilter } from '../FilteredPageSection'
import { allColors } from './static'

const ColorSelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>> }> = ({
   setFilters,
}): JSX.Element => {
   return (
      <Accordion type="single" collapsible>
         <AccordionItem value="Color">
            <AccordionTrigger>Color</AccordionTrigger>
            <AccordionContent>
               <Accordion type="single" collapsible>
                  {allColors.map((color) => (
                     <AccordionItem key={color} value={color} className='border-none px-3 py-1'>
                        <p
                           className="cursor-pointer"
                           onClick={() => {
                              setFilters((prev) => ({ ...prev, color: color }))
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
