import { IFilter, IProduct } from '#types/index'
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '#ui/breadcrumb'

interface IProductBread {}

const ProductBread: React.FC<{
   category: {
      main: string
      sub: string
      child: string
   }
}> = ({ category }): JSX.Element => {
   return (
      <Breadcrumb>
         <BreadcrumbList>
            <BreadcrumbItem className="text-white">
               <BreadcrumbLink href="/" className="hover:text-blue-700">
                  Home
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem className="text-white">
               <BreadcrumbLink className="hover:text-blue-700" href="/filtered/categories">
                  Categories
               </BreadcrumbLink>
            </BreadcrumbItem>
            {category?.main && (
               <>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem className="text-white">
                     <BreadcrumbLink className="hover:text-blue-700" href={`/filtered/${category.main}`}>
                        {category.main}
                     </BreadcrumbLink>
                  </BreadcrumbItem>
               </>
            )}
            {category?.main && category?.sub && (
               <>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem className="text-white">
                     <BreadcrumbLink
                        className="hover:text-blue-700"
                        href={`/filtered/${category.main}-${category.sub}`}
                     >
                        {category.sub}
                     </BreadcrumbLink>
                  </BreadcrumbItem>
               </>
            )}
            {category?.main && category?.sub && category?.child && (
               <>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem className="text-white">
                     <BreadcrumbLink
                        className="hover:text-blue-700"
                        href={`/filtered/${category.main}-${category.sub}-${category.child}`}
                     >
                        {category.child}
                     </BreadcrumbLink>
                  </BreadcrumbItem>
               </>
            )}
         </BreadcrumbList>
      </Breadcrumb>
   )
}

export default ProductBread
