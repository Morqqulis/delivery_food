import DefaultLayout from '#layouts/DefaultLayout'
import UserAside from '#ui/UserAdise/UserAside'

interface Ipage {}

const UserOrdersPage = () => {
   return (
      <DefaultLayout full>
         <main>
            <div className="container flex h-full items-start gap-5">
               <UserAside />
            </div>
         </main>
      </DefaultLayout>
   )
}

export default UserOrdersPage
