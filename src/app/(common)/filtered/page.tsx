import DefaultLayout from '#layouts/DefaultLayout'
import BasketSection from '#sections/Basket/BasketSection'
import ProductsFiltered from '#ui/Products/ProductsFiltered'
import { NextPage } from 'next'

const FilterPage: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full={true}>
         <main>
            <ProductsFiltered />
         </main>
      </DefaultLayout>
   )
}

export default FilterPage
