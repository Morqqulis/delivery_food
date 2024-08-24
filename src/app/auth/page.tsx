import DefaultLayout from '#layouts/DefaultLayout'
import { NextPage } from 'next'

const Auth: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full={false}>
         <main className={`flex-[1_1_auto]`}>Salam Auth</main>
      </DefaultLayout>
   )
}

export default Auth
