import DefaultLayout from '#layouts/DefaultLayout'
import ProductAdd from '#sections/Seller/Products/ProductAdd'

interface Ipage {}

const AddProduct: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false}>
         <main>
            <ProductAdd />
         </main>
      </DefaultLayout>
   )
}

export default AddProduct
