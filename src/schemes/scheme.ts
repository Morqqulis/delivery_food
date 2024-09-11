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

export const checkoutSchema = z.object({
   fullName: z.string().min(1, 'Adınızı daxil edin'),
   city: z.string().min(1, 'Şəhər adı daxil edin'),
   deliveryType: z.string().min(1, 'Delivery type is required'),
   phone: z.string().min(1, 'Phone number is required'),
   street: z.string().min(1, 'Street is required'),
   sellerNote: z.string().min(1, 'Note is required'),
   village: z.string().min(1, 'Village is required'),
   deliveryNote: z.string().min(1, 'Delivery note is required'),
})

export const userProfileSchema = z.object({
   name: z.string().min(2, 'Adınızı daxil edin.'),
   email: z
      .string()
      .min(4, {
         message: 'Emailinizi daxil edin.',
      })
      .email({
         message: 'Emailinizi duzgun daxil edin.',
      }),
   phone: z
      .string({
         invalid_type_error: 'Telefon nömrəniz duzgun daxil edilməyib.',
         required_error: 'Telefon nömrəsi mutləqdir.',
         message: 'Telefon nömrənizi daxil edin.',
      })
      .min(9, 'Telefon nömrənizi daxil edin.'),
   password: z
      .string({
         required_error: 'Şifrənizi daxil edin.',
         message: 'Şifrənizi daxil edin.',
         invalid_type_error: 'Şifrəniz duzgun daxil edilməyib.',
      })
      .min(1, 'Şifrənizi daxil edin.'),
   address: z
      .string({
         required_error: 'Ünvanı daxil etmek zəruridir.',
         message: 'Ünvanınızı daxil edin',
      })
      .min(5, 'Ünvanınızı daxil edin'),

   gender: z.enum(['male', 'female'], { required_error: 'Cins zəruridir' }),
})

export const emailSchema = z.string().email({ message: 'Please enter a valid email' })

export const addCommentSchema = z.object({
   name: z.string().min(2, 'Adınızı daxil edin.'),
   text: z
      .string({
         required_error: 'Rəyinizi daxil edin.',
         message: 'Rəyinizi daxil edin',
      })
      .min(5, 'Rəyinizi  daxil edin'),
})
