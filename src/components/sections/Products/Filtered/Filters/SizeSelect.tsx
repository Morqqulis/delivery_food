import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#ui/accordion'
import { IFilter } from '../FilteredPageSection'
import { allSize } from './static'

const SizeSelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>> }> = ({
   setFilters,
}): JSX.Element => {
   return (
      <Accordion type="single" collapsible>
         <AccordionItem value="Size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
               <Accordion type="single" collapsible>
                  {allSize.map((size) => (
                     <AccordionItem key={size} value={size} className='border-none px-3 py-1'>
                        <p
                           className="cursor-pointer"
                           onClick={() => {
                              setFilters((prev) => ({ ...prev, size: size }))
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
