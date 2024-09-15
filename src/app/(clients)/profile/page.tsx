import DefaultLayout from '#layouts/DefaultLayout'
import QueryProvider from '#providers/QueryProvider'
import ProfileSection from '#sections/Profile/ProfileSection'
import UserAside from '#ui/UserAdise/UserAside'
import { NextPage } from 'next'

const UserPage: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full>
         <main>
            <div className="container flex items-start gap-5 py-20">
               <UserAside />
               <QueryProvider>
                  <ProfileSection />
               </QueryProvider>
            </div>
         </main>
      </DefaultLayout>
   )
}

export default UserPage
