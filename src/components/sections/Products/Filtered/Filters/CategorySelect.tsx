import { IFilter } from '../FilteredPageSection'
import { allCategories } from './static'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#ui/accordion'

const CategorySelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>> }> = ({
   setFilters,
}): JSX.Element => {
   return (
      <Accordion type="single" collapsible>
         <AccordionItem value="All">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent className='px-3'>
               <Accordion type="single" collapsible>
                  {Object.entries(allCategories).map(([parent, subcategories]) => (
                     <AccordionItem key={parent} value={parent}>
                        <AccordionTrigger
                           onClick={() =>
                              setFilters((prev) => ({ ...prev, category: { parent, current: '', childCategory: '' } }))
                           }
                        >
                           {parent}
                        </AccordionTrigger>
                        <AccordionContent>
                           {Object.entries(subcategories).map(([current, items]) => (
                              <Accordion className="px-3" key={current} type="single" collapsible>
                                 <AccordionItem value={current} className="">
                                    <AccordionTrigger
                                       onClick={() =>
                                          setFilters((prev) => ({ ...prev, category: { ...prev.category, current } }))
                                       }
                                    >
                                       {current}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                       {items.map((childCategory) => (
                                          <p
                                             onClick={() =>
                                                setFilters((prev) => ({
                                                   ...prev,
                                                   category: { ...prev.category, childCategory },
                                                }))
                                             }
                                             className="cursor-pointer px-3 py-1"
                                             key={childCategory}
                                          >
                                             {childCategory}
                                          </p>
                                       ))}
                                    </AccordionContent>
                                 </AccordionItem>
                              </Accordion>
                           ))}
                        </AccordionContent>
                     </AccordionItem>
                  ))}
               </Accordion>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}

export default CategorySelect
