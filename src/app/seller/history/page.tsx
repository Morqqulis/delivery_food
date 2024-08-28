import DefaultLayout from '#layouts/DefaultLayout'
import SellerHistory from '#pages/Seller/History/SellerHistory'

const History: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false}>
         <main>
            <SellerHistory />
         </main>
      </DefaultLayout>
   )
}

export default History
