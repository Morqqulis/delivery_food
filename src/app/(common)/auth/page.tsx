import DefaultLayout from '#layouts/DefaultLayout'
import AuthWrapper from '#sections/Auth/AuthWrapper'
import { NextPage } from 'next'

const Auth: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full={false}>
         <main>
            <AuthWrapper />
         </main>
      </DefaultLayout>
   )
}

export default Auth
