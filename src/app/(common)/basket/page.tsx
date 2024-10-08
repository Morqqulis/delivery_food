import DefaultLayout from '#layouts/DefaultLayout'
import BasketSection from '#sections/Basket/BasketSection'
import { NextPage } from 'next'

const Basket: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full={true}>
         <main>
            <BasketSection />
         </main>
      </DefaultLayout>
   )
}

export default Basket
