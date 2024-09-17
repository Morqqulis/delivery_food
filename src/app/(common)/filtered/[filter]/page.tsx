'use client'

import DefaultLayout from '#layouts/DefaultLayout'
import FilteredPageSection from '#sections/Products/Filtered/FilteredPageSection'


const FilteredCategoryPage = ({ params: { filter } }: { params: { filter: string } }) => {
   return (
      <DefaultLayout full={true}>
         <main>
            <FilteredPageSection title={filter} />
         </main>
      </DefaultLayout>
   )
}

export default FilteredCategoryPage
