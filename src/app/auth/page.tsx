import DefaultLayout from '#layouts/DefaultLayout'
import AuthSection from '#pages/Auth/AuthSection'
import { Toaster } from '#ui/toaster'
import { NextPage } from 'next'

const Auth: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full={false}>
         <main>
            <AuthSection />
            <Toaster  />
         </main>
      </DefaultLayout>
   )
}

export default Auth
