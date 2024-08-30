'use client'
import { userGetBasket } from '#backend/actions/userActions'
import Btn from '#ui/Btn/Btn'
import Logo from '#ui/Logo'
import { LogIn } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import HeaderSearch from './HeaderSearch'
import HeaderUser from './HeaderUser'

const Header = () => {
   const [basket, setBasket] = useState([])
   const session = useSession()

   useEffect(() => {
      ;(async () => {
         const user = await userGetBasket('66cf65fb10760b3633230284')
         setBasket(user?.basket)
      })()
   }, [])

   return (
      <header className={`${styles.header}`}>
         <div className="container">
            <nav className={`flex items-center justify-between gap-8`}>
               <Logo className={styles.logo} />
               <HeaderSearch />
               <Btn
                  className={`px-11 py-2`}
                  text={`Orders (${basket?.length || 0})`}
                  type={'button'}
                  ariaLabel={'Orders Btn'}
                  href="/user/basket"
               />
               {session.status === 'loading' ? (
                  <div>Loading...</div>
               ) : session.status === 'unauthenticated' ? (
                  <Link className={`group p-0`} href={'/auth'}>
                     <LogIn className={`duration-300 group-hover:text-mini-100`} />
                  </Link>
               ) : (
                  <HeaderUser userData={session?.data?.user} />
               )}
            </nav>
         </div>
      </header>
   )
}

export default Header
