import DefaultLayout from '#layouts/DefaultLayout'
import SellerHome from '#sections/Seller/Home/SellerHome'

const Seller: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false} aside={true}>
         <main>
            <SellerHome />
         </main>
      </DefaultLayout>
   )
}

export default Seller
