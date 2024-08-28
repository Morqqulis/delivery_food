import DefaultLayout from '#layouts/DefaultLayout'
import SellerProducts from '#pages/Seller/Products/SellerProducts'

interface Ipage {}

const Products: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false}>
         <main>
            <SellerProducts />
         </main>
      </DefaultLayout>
   )
}

export default Products
