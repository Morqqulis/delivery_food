import DefaultLayout from '#layouts/DefaultLayout'
import ProfileSection from '#sections/Profile/ProfileSection'
import { NextPage } from 'next'

const UserPage: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full>
         <main>
            <ProfileSection />
         </main>
      </DefaultLayout>
   )
}

export default UserPage
