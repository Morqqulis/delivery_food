'use client'

import { Button } from '#ui/button'
import { useState } from 'react'
import './Auth.style.scss'
const AuthSection: React.FC = (): JSX.Element => {
   const [title, setTitle] = useState(true)

   return (
      <div className="container">
         <h1>{title ? 'Login' : 'Register'}</h1>

         <form className='authForm'>
            <input type="text" placeholder="Enter your name" />
            <input type="email" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your password" />
            <input type="password" placeholder="Confirm your password" />
         </form>

         <Button onClick={() => setTitle(!title)}>{title ? 'Register' : 'Login'}</Button>
      </div>
   )
}

export default AuthSection
