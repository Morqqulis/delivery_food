'use client'
import { useState } from 'react'
import FilteredSection from './FilteredSection'
import ProductsSection from './ProductsSection'
import { IFilter } from '#types/index'
import QueryProvider from '#providers/QueryProvider'

const FilteredPageSection: React.FC = (): JSX.Element => {
   const [filters, setFilters] = useState({} as IFilter)
   return (
      <div className="container flex gap-1 py-3">
         <QueryProvider>
            <FilteredSection setFilters={setFilters} filters={filters} />
            <ProductsSection filters={filters} />
         </QueryProvider>
      </div>
   )
}

export default FilteredPageSection
