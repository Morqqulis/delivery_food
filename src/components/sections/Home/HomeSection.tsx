import QueryProvider from '#providers/QueryProvider'
import ProductsSlider from '#ui/Products/ProductsSlider'

const HomeSection: React.FC = (): JSX.Element => {
   return (
      <section className={`py-20`}>
         <div className="container flex flex-col gap-10">
            <h1 className={`mb-5 text-center text-5xl`}>New Products</h1>
            <QueryProvider>
               <ProductsSlider title="all" />
            </QueryProvider>
         </div>
      </section>
   )
}

export default HomeSection
