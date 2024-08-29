import DefaultLayout from '#layouts/DefaultLayout'
import UserMainSection from '#sections/User/UserMainSection'
import { NextPage } from 'next'

const UserPage: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full>
         <main>
            <UserMainSection />
         </main>
      </DefaultLayout>
   )
}

export default UserPage
