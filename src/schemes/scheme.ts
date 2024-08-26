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
   name: z.string({
      required_error: 'Name is required',
   }).min(2, {
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
