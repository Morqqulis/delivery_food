import DefaultLayout from '#layouts/DefaultLayout'
import SellerOrders from '#sections/Seller/Orders/SellerOrders'

interface Ipage {}

const Orders: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false} aside={true}>
         <main>
            <SellerOrders />
         </main>
      </DefaultLayout>
   )
}

export default Orders
