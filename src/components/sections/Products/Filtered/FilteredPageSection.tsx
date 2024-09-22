'use client'
import { useEffect, useState } from 'react'
import FilteredSection from './FilteredSection'
import ProductsSection from './ProductsSection'
import { IFilter } from '#types/index'
import QueryProvider from '#providers/QueryProvider'

const FilteredPageSection: React.FC<{ title: string }> = ({ title }): JSX.Element => {
   const [filters, setFilters] = useState({} as IFilter)

   useEffect(() => {
      if (!title) return

      const selected = title && title !== 'categories' ? title.split('-') : []
      if (!selected) return
      setFilters({
         ...filters,
         category: {
            main: selected[0],
            sub: selected[1],
            child: selected[2],
         },
      })
   }, [title])

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
