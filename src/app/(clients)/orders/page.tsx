import DefaultLayout from '#layouts/DefaultLayout'
import QueryProvider from '#providers/QueryProvider'
import OrdersWrapper from '#sections/Orders/OrdersWrapper'
import UserAside from '#ui/UserAdise/UserAside'

interface Ipage {}

const UserOrdersPage = () => {
   return (
      <DefaultLayout full>
         <main>
            <div className="container flex h-full items-start gap-5">
               <UserAside />
               <QueryProvider>
                  <OrdersWrapper />
               </QueryProvider>
            </div>
         </main>
      </DefaultLayout>
   )
}

export default UserOrdersPage
