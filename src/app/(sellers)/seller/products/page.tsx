import DefaultLayout from '#layouts/DefaultLayout'
import SellerProducts from '#sections/Seller/Products/SellerProducts'

interface Ipage {}

const Products: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false} aside={true}>
         <main>
            <SellerProducts />
         </main>
      </DefaultLayout>
   )
}

export default Products
