import DefaultLayout from '#layouts/DefaultLayout'
import AuthSection from '#sections/Auth/AuthSection'
import { NextPage } from 'next'

const Auth: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full={false}>
         <main className={`flex-[1_1_auto]`}>
            <AuthSection />
         </main>
      </DefaultLayout>
   )
}

export default Auth
