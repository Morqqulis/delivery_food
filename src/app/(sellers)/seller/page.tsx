import DefaultLayout from '#layouts/DefaultLayout'
import SellerHome from '#sections/Seller/Home/SellerHome'

const Seller: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false}>
         <main>
            <SellerHome />
         </main>
      </DefaultLayout>
   )
}

export default Seller