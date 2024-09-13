import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '#ui/sheet'
import { allCategories } from './static'

const CategorySheet: React.FC = (): JSX.Element => {
   return (
      <Sheet>
         <SheetTrigger className="flex items-center justify-center rounded-[.3125rem] bg-tomato-100 px-11 py-2 text-base font-medium text-white transition-all duration-300 ease-in hover:scale-105 hover:bg-mini-100 hover:text-dark-900 disabled:bg-slate-500">
            Categories
         </SheetTrigger>
         <SheetContent side={'top'} className="border-none bg-cake-200">
            <SheetHeader>
               <SheetTitle className="">Choose your want</SheetTitle>
               <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="flex flex-wrap gap-2">
               {allCategories.map((category) => (
                  <SheetTrigger
                     key={category}
                     className="w-[300px] whitespace-nowrap rounded-[.3125rem] px-3 py-2 text-base font-medium outline-none hover:bg-mini-100 hover:text-dark-900"
                  >
                     {category}
                  </SheetTrigger>
               ))}
            </div>
         </SheetContent>
      </Sheet>
   )
}

export default CategorySheet
