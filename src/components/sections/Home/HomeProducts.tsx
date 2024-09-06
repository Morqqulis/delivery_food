import { IProduct } from '#types/index'
import axios from 'axios'
import ProductCard from './ProductCard'
import productModel from '#backend/models/productModel'

export const revalidate = 0

const HomeProducts: React.FC = async (): Promise<JSX.Element> => {
   const res = await axios.get('http://localhost:3000/api/products')
   const products: IProduct[] = res.data

   return (
      <div className="flex flex-col gap-[26px]">
         <div className="flex w-full gap-7 overflow-x-auto">
            {products.length > 0 &&
               products?.map((product: IProduct) => <ProductCard key={product._id.toString()} product={product} />)}
         </div>
      </div>
   )
}

export default HomeProducts
