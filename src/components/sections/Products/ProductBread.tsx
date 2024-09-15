import { IProduct } from '#types/index'
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '#ui/breadcrumb'

interface IProductBread {}

const ProductBread: React.FC<{ data: IProduct & { ordersCount: number } }> = ({ data }): JSX.Element => {
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
               <BreadcrumbLink className="hover:text-blue-700" href="/filtered">
                  Categories
               </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem className="text-white">{data?.attributes.category.main}</BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem className="text-white">{data?.attributes?.category.sub}</BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem className="text-white">{data?.attributes.category.child}</BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   )
}

export default ProductBread
