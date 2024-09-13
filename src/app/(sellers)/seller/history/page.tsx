import DefaultLayout from '#layouts/DefaultLayout'
import SellerHistory from '#sections/Seller/History/SellerHistory'

const History: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false} aside={true}>
         <main>
            <SellerHistory />
         </main>
      </DefaultLayout>
   )
}

export default History
