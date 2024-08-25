import { IProductsSection } from '#types/index'
import ProductCard from './ProductCard'

const ProductsSection: React.FC<IProductsSection> = ({ title, products }): JSX.Element => {
    
   return (
      <div className="flex flex-col gap-[26px]">
         <h3 className="" >{title}</h3>
         <div className="flex w-full gap-7 overflow-x-auto">
            {products.map((product) => (
               <ProductCard key={product._id} product={product} />
            ))}
         </div>
      </div>
   )
}

export default ProductsSection
