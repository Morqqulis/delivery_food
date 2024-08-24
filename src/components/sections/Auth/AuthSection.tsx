'use client'

import { Button } from '#ui/button'
import { useState } from 'react'
import styles from './Auth.module.scss'
const AuthSection: React.FC = (): JSX.Element => {
   const [title, setTitle] = useState(true)

   const submitHandler = (event: React.FormEvent) => {
      event.preventDefault()
      console.log(event);
      
   }

   return (
      <div className="container flex flex-col gap-4">
         <h1 className={styles.title}>{title ? 'Login' : 'Register'}</h1>

         <form className={styles.authForm} onSubmit={(e) => submitHandler(e)}>
            <input type="email" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your password" />

            {!title && (
               <>
                  <input type="text" placeholder="Enter your name" />

                  <label htmlFor="gender" className="flex items-center gap-2">
                     Gender
                     <select name="gender" id="gender">
                        <option value={'male'}>Male</option>
                        <option value={'female'}>Female</option>
                     </select>
                  </label>
               </>
            )}

            <Button type="submit" className="max-w-[300px]">
               {title ? 'Login' : 'Register'}
            </Button>
         </form>

         <span>
            {title ? 'Don`t have an account?' : 'Already have an account?'}{' '}
            <button onClick={() => setTitle(!title)} className="font-bold text-blue-800">
               click here
            </button>
         </span>
      </div>
   )
}

export default AuthSection
