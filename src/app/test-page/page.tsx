'use client'
import axios from 'axios'
import React, { useState } from 'react'

const ImageUploader = () => {
   const [images, setImages] = useState<File[]>([])
   const [uploadProgress, setUploadProgress] = useState<number[]>([])
   const [imageUrls, setImageUrls] = useState<string[]>([])

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedImages = e.target.files
      if (selectedImages) {
         setImages(Array.from(selectedImages))
         setUploadProgress(Array(selectedImages.length).fill(0))
      }
   }

   const toBase64 = (image: File): Promise<string> =>
      new Promise((resolve, reject) => {
         const reader = new FileReader()
         reader.readAsDataURL(image)
         reader.onload = () => resolve(reader.result as string)
         reader.onerror = (error) => reject(error)
      })

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (images.length === 0) return

      // Преобразуем все изображения в base64
      const base64Images = await Promise.all(images.map((image) => toBase64(image)))
      try {
         const res = await axios.post('/api/upload', { images: base64Images })

         const { urls } = res.data

         // Устанавливаем URL изображений
         setImageUrls(urls)

         // Обновляем прогресс загрузки
         setUploadProgress(base64Images.map(() => 100))
      } catch (error) {
         console.error('Error uploading images:', error)
      }
   }
   console.log(imageUrls)

   return (
      <form
         className="mx-auto flex max-w-lg flex-col items-center justify-center gap-5 border py-20"
         onSubmit={handleSubmit}
      >
         <input name="file" id="file" type="file" onChange={handleChange} multiple />
         <button type="submit">Submit</button>

         {images.length > 0 && (
            <div>
               {images.map((image, index) => (
                  <div key={index}>
                     <span>{image.name}</span>
                     <progress value={uploadProgress[index] || 0} max="100">
                        {uploadProgress[index] || 0}%
                     </progress>
                  </div>
               ))}
            </div>
         )}
      </form>
   )
}

export default ImageUploader
