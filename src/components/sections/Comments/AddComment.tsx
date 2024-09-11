'use client'
import { addCommentSchema } from '#schemes/scheme'
import Btn from '#ui/Btn/Btn'
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '#ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import StarRating from './StarRating'
import { useState } from 'react'
import { IAddComment } from '#types/index'
import { productAddComment } from '#backend/actions/productActions'

const AddComment: React.FC<{ prodId: string }> = ({ prodId }): JSX.Element => {
   const [rating, setRating] = useState<number>(0)
   const form = useForm<z.infer<typeof addCommentSchema>>({
      defaultValues: {
         name: '',
         text: '',
      },
      resolver: zodResolver(addCommentSchema),
   })
   const { handleSubmit, register, reset } = form

   const submitForm = async (data: IAddComment) => {
      if (!rating) return
      await productAddComment(prodId, { ...data, rating, date: new Date() })
      reset()
      setRating(0)
   }
   return (
      <Dialog>
         <DialogTrigger className="font-bold text-green-700">
            <div className="rounded-[.3125rem] bg-tomato-100 p-2 text-base font-medium text-white transition-all duration-300 ease-in hover:scale-105 hover:bg-mini-100 hover:text-dark-900 disabled:bg-slate-500">
               Add Comment
            </div>
         </DialogTrigger>
         <DialogContent className="w-[60%] bg-gray-800">
            <DialogHeader>
               <DialogTitle></DialogTitle>
               <DialogDescription>Enter all area</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center gap-3">
               <input
                  type="text"
                  {...register('name')}
                  className="w-full rounded-lg p-2 text-black outline-none"
                  placeholder="Enter your name"
               />
               <textarea
                  {...register('text')}
                  className="w-full rounded-lg p-2 text-black outline-none"
                  rows={5}
                  placeholder="Enter your comment"
               />
               <StarRating onRatingChange={setRating} rating={rating} size="20" />
               <Btn text="ADD" type="submit" />
            </form>
         </DialogContent>
      </Dialog>
   )
}

export default AddComment
