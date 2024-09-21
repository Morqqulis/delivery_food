'use client'
import LikeHeart from '#ui/LikeHeart'
import Image from 'next/image'
import { useState } from 'react'
import '#styles/scrollbar.scss'
interface IImageContainer {}

const ImageContainer: React.FC<{ images: string[] }> = ({ images }): JSX.Element => {
   const [selectedImage, setSelectedImage] = useState(images[0])
   return (
      <div className="h-full w-full">
         <div className={` ${images.length > 1 ? 'h-[75%]' : 'h-full'} w-full`}>
            <Image src={selectedImage} width={500} height={500} alt={'product image'} className="h-full w-full" />
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
