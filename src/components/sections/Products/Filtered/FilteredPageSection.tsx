'use client'
import { useState } from 'react'
import FilteredSection from './FilteredSection'
import ProductsSection from './ProductsSection'
import { IFilter } from '#types/index'
import QueryProvider from '#providers/QueryProvider'

const FilteredPageSection: React.FC = (): JSX.Element => {
   const [filters, setFilters] = useState({} as IFilter)

   return (
      <section className={`py-20`}>
         <div className="container grid grid-cols-[.25fr_1fr] items-start gap-5">
            <QueryProvider>
               <FilteredSection setFilters={setFilters} filters={filters} />
               <ProductsSection filters={filters} />
            </QueryProvider>
         </div>
      </section>
   )
}

export default FilteredPageSection
