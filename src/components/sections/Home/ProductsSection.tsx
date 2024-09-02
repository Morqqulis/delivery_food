import { IProductsSection } from '#types/index'
import ProductCard from './ProductCard'

const ProductsSection: React.FC<IProductsSection> = ({ title, products }): JSX.Element => {
   return (
      <section className={`py-20`}>
         <div className="container">
            <h1 className={`mb-10 text-center text-5xl`}>{title}</h1>
            <div className="flex flex-col gap-[26px]">
               <div className="flex w-full gap-7 overflow-x-auto">
                  {products.map((product) => (
                     <ProductCard key={product._id.toString()} product={product} />
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}

export default ProductsSection
