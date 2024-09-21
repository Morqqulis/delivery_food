'use client'
import LikeHeart from '#ui/LikeHeart'
import Image from 'next/image'
import { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#ui/carousel'
import { calculateDistance } from '../../../functions/helpers'
interface IImageContainer {}

const ImageContainer: React.FC<{ images: string[] }> = ({ images }): JSX.Element => {
   const [selectedImage, setSelectedImage] = useState(images[0])
   const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)', transformOrigin: 'center center' })

   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100

      setZoomStyle({
         transform: 'scale(2)',
         transformOrigin: `${x}% ${y}%`,
      })
   }

   const handleMouseLeave = () => {
      setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center center' })
   }

   return (
      <div className="h-full w-full">
         <div className={` ${images.length > 1 ? 'h-[75%]' : 'h-full'} relative w-full overflow-hidden`}>
            <Image
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
               src={selectedImage}
               width={500}
               height={500}
               alt="product image"
               className="h-full w-full transition-transform duration-300 ease-in-out"
               style={zoomStyle}
            />
         </div>
         {images.length > 1 && (
            <div className="mt-[1%] flex h-[24%] w-full items-center justify-center">
               <Carousel className={`flex w-[80%] max-w-[1200px] gap-3`}>
                  <CarouselContent className={``}>
                     {images.map((image) => (
                        <CarouselItem className={`basis-[90px] cursor-pointer`} key={image}>
                           <Image
                              onClick={() => setSelectedImage(image)}
                              src={image}
                              width={50}
                              height={50}
                              alt={'product image'}
                              className="h-full w-full"
                           />
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
               </Carousel>
            </div>
         )}
      </div>
   )
}

export default ImageContainer
