import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#ui/accordion'
import { allCategories } from '#static/filters'
import { IFilter } from '#types/index'

const CategorySelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>>; filters: IFilter }> = ({
   setFilters,
   filters,
}): JSX.Element => {
   return (
      <Accordion type="single" collapsible>
         <AccordionItem value="All">
            <AccordionTrigger>
               Categories
               <p className="ml-2 text-[13px]">
                  {filters?.category?.child
                     ? `/ ${filters.category.main} / ${filters.category.sub} / ${filters.category.child}`
                     : filters?.category?.sub
                       ? `/ ${filters.category.main} / ${filters.category.sub}`
                       : filters?.category?.main
                         ? `/ ${filters.category.main}`
                         : ''}
               </p>
            </AccordionTrigger>
            <AccordionContent className="px-3">
               <Accordion type="single" collapsible>
                  <AccordionItem
                     value=""
                     className="cursor-pointer border-none font-bold"
                     onClick={() => setFilters((prev) => ({ ...prev, category: { main: '', sub: '', child: '' } }))}
                  >
                     All
                  </AccordionItem>
                  {Object.entries(allCategories).map(([main, subcategories]) => (
                     <AccordionItem key={main} value={main}>
                        <AccordionTrigger
                           onClick={() => setFilters((prev) => ({ ...prev, category: { main, child: '', sub: '' } }))}
                        >
                           {main}
                        </AccordionTrigger>
                        <AccordionContent>
                           {Object.entries(subcategories).map(([sub, items]) => (
                              <Accordion className={`px-3`} key={sub} type="single" collapsible>
                                 <AccordionItem value={sub} className="">
                                    <AccordionTrigger
                                       onClick={() =>
                                          setFilters((prev) => ({
                                             ...prev,
                                             category: { ...prev.category, sub, child: '' },
                                          }))
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
                                             className={`cursor-pointer px-3 py-1`}
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
