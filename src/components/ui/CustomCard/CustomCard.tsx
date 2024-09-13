'use client'

interface ICustomCard {}
import { IProduct } from '#types/index'
import { AspectRatio } from '#ui/aspect-ratio'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ITestProduct } from '../../../app/test-page/page'

// interface ProductCardProps {
//    product: IProduct
// }

const CustomCard = ({ product }: { product: ITestProduct }) => {
   return (
      <Link href={`/products/${product.id}`}>
         <Card
            className={`group/card relative z-10 max-w-[320px] border-none bg-[rgba(255,255,255,0.15)] text-white transition-all ease-in-out before:absolute before:left-1/2 before:top-1/2 before:-z-[1] before:h-0 before:w-0 before:rounded-xl before:bg-white before:opacity-0 before:transition-all before:duration-300 before:ease-in hover:text-black hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-full hover:before:opacity-100`}
         >
            <CardHeader className={`flex flex-col gap-4 px-3 py-2`}>
               <AspectRatio className={`duration-300 ease-in group-hover/card:scale-105`} ratio={1 / 1}>
                  <Image className="rounded-md object-cover" src="/qazan.svg" alt="Image" fill priority />
               </AspectRatio>

               <CardTitle
                  className={`text-xl font-semibold tracking-tight duration-300 ease-in group-hover/card:text-black`}
               >
                  {product.name}
               </CardTitle>
               <CardDescription>
                  {product.description.length > 40 ? product.description.slice(0, 40) + '...' : product.description}
               </CardDescription>
            </CardHeader>
            <CardContent>
               <p>Card Content</p>
            </CardContent>
            <CardFooter>
               <p>Card Footer</p>
            </CardFooter>
         </Card>
      </Link>
   )
}

export default CustomCard
