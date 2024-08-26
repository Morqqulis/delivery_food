import axios from 'axios'
import ProductsSection from './ProductsSection'

const HomeSection: React.FC = async (): Promise<JSX.Element> => {
   const result = await axios.get('http://localhost:3000/api/products')
   const serializedProducts = JSON.parse(JSON.stringify(await result.data.products))

   return (
      <div className="container flex flex-col gap-10">
         <ProductsSection title={'New Products'} products={serializedProducts} />
         <ProductsSection title={'All Products'} products={serializedProducts} />
      </div>
   )
}

export default HomeSection
