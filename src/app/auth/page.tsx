import DefaultLayout from '#layouts/DefaultLayout'
import AuthSection from '#pages/Auth/AuthSection'
import { NextPage } from 'next'

const Auth: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full={false}>
         <main>
            <AuthSection />
         </main>
      </DefaultLayout>
   )
}

export default Auth
