'use client'

import { LoginSchema, RegisterSchema } from '#schemes/scheme'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Auth.module.scss'
import Btn from '#ui/Btn/Btn'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormValues } from '#types/index'

const AuthSection: React.FC = (): JSX.Element => {
   const [title, setTitle] = useState(true)

   const getScheme = () => (title ? LoginSchema : RegisterSchema)

   const getDefaultValues = () => {
      if (title) {
         return {
            email: '',
            password: '',
         }
      } else {
         return {
            email: '',
            password: '',
            name: '',
            gender: 'male',
         }
      }
   }

   const { register, handleSubmit, reset } = useForm<FormValues>({
      resolver: zodResolver(getScheme()),
      defaultValues: getDefaultValues(),
   })

   const submitHandler = async (data: FormValues) => {
      if (title) {
         const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         })
         const result = await response.json()
         console.log(result)
      } else {
         const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         })
         const result = await response.json()
         console.log(result)
      }

      reset()
   }

   return (
      <div className="container flex min-h-screen flex-col items-center justify-center gap-4">
         <h1 className={styles.title}>{title ? 'Login' : 'Register'}</h1>
         <form className={styles.authForm} onSubmit={handleSubmit(submitHandler)}>
            <input type="email" placeholder="Enter your email" {...register('email')} />
            <input type="password" placeholder="Enter your password" {...register('password')} />

            {!title && (
               <>
                  <input type="text" placeholder="Enter your name" {...register('name')} />

                  <label htmlFor="gender" className="flex items-center gap-2">
                     Gender
                     <select id="gender" {...register('gender')}>
                        <option value={'male'}>Male</option>
                        <option value={'female'}>Female</option>
                     </select>
                  </label>
               </>
            )}

            <Btn type="submit" className="max-w-[300px]" text={title ? 'Login' : 'Register'} ariaLabel="Auth Btn" />
         </form>

         <span>
            {title ? 'Don`t have an account?' : 'Already have an account?'}
            <button onClick={() => setTitle(!title)} className="font-bold text-blue-800">
               click here
            </button>
         </span>
      </div>
   )
}

export default AuthSection
