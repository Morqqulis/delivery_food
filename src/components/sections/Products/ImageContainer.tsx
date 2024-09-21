'use client'
import LikeHeart from '#ui/LikeHeart'
import Image from 'next/image'
import { useState } from 'react'
import '#styles/scrollbar.scss'
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
         <div className={` ${images.length > 1 ? 'h-[75%]' : 'h-full'} w-full`}>
            <div
               className="relative h-full w-full overflow-hidden"
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
            >
               <Image
                  src={selectedImage}
                  width={500}
                  height={500}
                  alt="product image"
                  className="h-full w-full transition-transform duration-300 ease-in-out"
                  style={zoomStyle}
               />
            </div>
         </div>
         {images.length > 1 && (
            <div className="scrollbar-custom mt-[1%] flex h-[24%] w-full items-center gap-3 overflow-auto">
               {images.map((image) => (
                  <div key={image} className="h-[50px] w-[50px] cursor-pointer" onClick={() => setSelectedImage(image)}>
                     <Image src={image} width={50} height={50} alt={'product image'} className="h-full w-full" />
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default ImageContainer
