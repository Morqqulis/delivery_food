import DefaultLayout from '#layouts/DefaultLayout'
import SellerOrders from '#pages/Seller/Orders/SellerOrders'

interface Ipage {}

const Orders: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false}>
         <main>
            <SellerOrders />
         </main>
      </DefaultLayout>
   )
}

export default Orders
