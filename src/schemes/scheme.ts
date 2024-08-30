import { z } from 'zod'

export const LoginSchema = z.object({
   email: z
      .string({
         required_error: 'Email is required',
      })
      .min(2, {
         message: 'Please enter a valid email.',
      }),
   password: z
      .string({
         required_error: 'Password is required',
      })
      .min(5, {
         message: 'Password must be at least 5 characters.',
      }),
})

export const RegisterSchema = z.object({
   firstName: z
      .string({
         required_error: 'Name is required',
      })
      .min(2, {
         message: 'Name must be at least 2 characters.',
      }),
   email: z
      .string({
         required_error: 'Email is required',
      })
      .min(2, {
         message: 'Please enter a valid email.',
      }),
   password: z
      .string({
         required_error: 'Password is required',
      })
      .min(5, {
         message: 'Password must be at least 5 characters.',
      }),
   gender: z.enum(['male', 'female'], {
      required_error: 'Gender is required',
   }),
})

export const StoreEditSchema = z.object({
   name: z.string(),
   secondName: z.string(),
   address: z.string(),
   phone: z.string(),
   email: z.string(),
   image: z.any(),
})

export const ProductSchema = z.object({
   name: z.string().min(1, 'Name is required'),
   description: z.string().min(1, 'Description is required'),
   price: z.number().positive('Price must be a positive number'),
   category: z.string().min(1, 'Category is required'),
   image: z.any().optional(),
})
