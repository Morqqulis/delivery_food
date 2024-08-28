import DefaultLayout from '#layouts/DefaultLayout'
import BasketSection from '#pages/Basket/BasketSection'
import { NextPage } from 'next'

const Auth: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full={true}>
         <main>
            <BasketSection />
         </main>
      </DefaultLayout>
   )
}

export default Auth
