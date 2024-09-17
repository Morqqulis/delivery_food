import { IProduct } from '#types/index'
import ProductsSlider from '#ui/Products/ProductsSlider'

interface ISliderContainer {}

const SliderContainer: React.FC<{ title: string; text: string; data?: IProduct }> = ({
   title,
   text,
   data,
}): JSX.Element => {
   return (
      <div className="mt-6 flex flex-col items-center gap-5">
         <div className="relative flex h-[50px] w-full items-center justify-center">
            <div className="h-1 w-full bg-white"></div>
            <div className="absolute left-[50%] translate-x-[-50%] bg-dark-400 px-5 text-center text-5xl">{text} </div>
         </div>
         <ProductsSlider title={title} product={data} />
      </div>
   )
}

export default SliderContainer
