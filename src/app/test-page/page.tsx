import DefaultLayout from '#layouts/DefaultLayout'
import ProfileSection from '#sections/Profile/ProfileSection'
import { IProduct } from '#types/index'
import { AspectRatio } from '#ui/aspect-ratio'
import Btn from '#ui/Btn/Btn'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#ui/carousel'
import CustomCard from '#ui/CustomCard/CustomCard'
import CustomDialog from '#ui/CustomDialog/CustomDialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#ui/dialog'
import Map from '#ui/Map/Map'
import MapAutocomplete from '#ui/Map/MapAutocomplete'
import MapDialog from '#ui/Map/MapDialog'
import UserAside from '#ui/UserAdise/UserAside'
import { SchemaTypes, Types } from 'mongoose'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export interface ITestProduct {
   id: string
   name: string
   description: string
   price: number
   image: string
}

const TestPage: NextPage = () => {
   const products: ITestProduct[] = [
      {
         id: Math.floor(Math.random() * 10000).toString(),
         name: 'Lorem Ipsum',
         description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis delectus consectetur tempora enim, vel impedit illum omnis eaque atque excepturi!',
         price: 1000,
         image: 'qazan.svg',
      },

      {
         id: Math.floor(Math.random() * 10000).toString(),
         name: 'Lorem Ipsum',
         description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis delectus consectetur tempora enim, vel impedit illum omnis eaque atque excepturi!',
         price: 1000,
         image: 'qazan.svg',
      },
      {
         id: Math.floor(Math.random() * 10000).toString(),
         name: 'Lorem Ipsum',
         description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis delectus consectetur tempora enim, vel impedit illum omnis eaque atque excepturi!',
         price: 1000,
         image: 'qazan.svg',
      },
      {
         id: Math.floor(Math.random() * 10000).toString(),
         name: 'Lorem Ipsum',
         description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis delectus consectetur tempora enim, vel impedit illum omnis eaque atque excepturi!',
         price: 1000,
         image: 'qazan.svg',
      },
      {
         id: Math.floor(Math.random() * 10000).toString(),
         name: 'Lorem Ipsum',
         description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis delectus consectetur tempora enim, vel impedit illum omnis eaque atque excepturi!',
         price: 1000,
         image: 'qazan.svg',
      },
      {
         id: Math.floor(Math.random() * 10000).toString(),
         name: 'Lorem Ipsum',
         description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis delectus consectetur tempora enim, vel impedit illum omnis eaque atque excepturi!',
         price: 1000,
         image: 'qazan.svg',
      },
   ]

   return (
      <DefaultLayout full={false}>
         <main>
            <MapDialog />

            <div className="container">
               <div className={`grid grid-cols-[380px_1fr] items-start py-20`}>
                  {/* <UserAside /> */}
                  {/* <ProfileSection /> */}
               </div>

               <Carousel className={``}>
                  <CarouselContent>
                     {products.map((product) => (
                        <CarouselItem className={`basis-1/3`} key={product.id}>
                           <CustomCard product={product} />
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
               </Carousel>
            </div>
         </main>
      </DefaultLayout>
   )
}

export default TestPage
