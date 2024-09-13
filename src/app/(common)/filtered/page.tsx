import DefaultLayout from '#layouts/DefaultLayout'
import FilteredPageSection from '#sections/Products/Filtered/FilteredPageSection'
import { NextPage } from 'next'

const FilterPage: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full={true}>
         <main>
            <FilteredPageSection />
         </main>
      </DefaultLayout>
   )
}

export default FilterPage
