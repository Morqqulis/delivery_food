import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#ui/select'
import { IFilter } from '../FilteredPageSection'
import { allCategories } from './static'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#ui/accordion'

const CategorySelect: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<IFilter>> }> = ({
   setFilters,
}): JSX.Element => {
   return <>CATEGORY</>
}

export default CategorySelect
