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
   name: z
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

export const StoreSchema = z.object({
   name: z.string().min(2, 'Name must be at least 2 characters'),
   secondName: z.string().min(2, 'Second name must be at least 2 characters').optional(),
   address: z.string().min(5, 'Address must be at least 5 characters'),
   phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
   email: z.string().email('Please enter a valid email address'),
   image: z.any().optional(),
})

export const ProductSchema = z.object({
   name: z.string().min(1, 'Name is required'),
   description: z.string().min(1, 'Description is required'),
   price: z.number().positive('Price must be a positive number'),
   category: z.string().min(1, 'Category is required'),
   image: z.any().optional(),
})
