import axios from 'axios'
import ProductsSection from './ProductsSection'

export const revalidate = 0

const HomeSection: React.FC = async (): Promise<JSX.Element> => {
   const result = await axios.get('http://localhost:3000/api/products')
   const serialisedResult = JSON.parse(JSON.stringify(await result.data))

   return (
      <div className="container flex flex-col gap-10">
         <ProductsSection title={'New Products'} products={serialisedResult} />
         <ProductsSection title={'All Products'} products={serialisedResult} />
      </div>
   )
}

export default HomeSection
