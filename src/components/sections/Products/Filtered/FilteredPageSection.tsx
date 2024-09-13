'use client'
import { useState } from 'react'
import FilteredSection from './FilteredSection'
import ProductsSection from './ProductsSection'
export interface IFilter {
   size?: string
   color?: string
   category?: string
}
const FilteredPageSection: React.FC = (): JSX.Element => {
   const [filters, setFilters] = useState({ size: '', color: '', category: '' } as IFilter)
   console.log(filters)
   return (
      <div className="container flex gap-1 py-3">
         <FilteredSection setFilters={setFilters} />
         <ProductsSection />
      </div>
   )
}

export default FilteredPageSection
