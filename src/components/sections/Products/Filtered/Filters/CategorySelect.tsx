import { IFilter } from '../FilteredPageSection'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#ui/accordion'
import { allCategories } from '#static/filters'

const CategorySelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>> }> = ({
   setFilters,
}): JSX.Element => {
   return (
      <Accordion type="single" collapsible>
         <AccordionItem value="All">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent className="px-3">
               <Accordion type="single" collapsible>
                  {Object.entries(allCategories).map(([main, subcategories]) => (
                     <AccordionItem key={main} value={main}>
                        <AccordionTrigger
                           onClick={() => setFilters((prev) => ({ ...prev, category: { main, child: '', sub: '' } }))}
                        >
                           {main}
                        </AccordionTrigger>
                        <AccordionContent>
                           {Object.entries(subcategories).map(([sub, items]) => (
                              <Accordion className="px-3" key={sub} type="single" collapsible>
                                 <AccordionItem value={sub} className="">
                                    <AccordionTrigger
                                       onClick={() =>
                                          setFilters((prev) => ({ ...prev, category: { ...prev.category, sub } }))
                                       }
                                    >
                                       {sub}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                       {items.map((child) => (
                                          <p
                                             onClick={() =>
                                                setFilters((prev) => ({
                                                   ...prev,
                                                   category: { ...prev.category, child },
                                                }))
                                             }
                                             className="cursor-pointer px-3 py-1"
                                             key={child}
                                          >
                                             {child}
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
