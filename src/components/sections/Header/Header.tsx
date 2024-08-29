'use client'
import Btn from '#ui/Btn/Btn'
import Logo from '#ui/Logo'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import styles from './Header.module.scss'
import HeaderSearch from './HeaderSearch'
import { useEffect, useState } from 'react'
import { userGetBasket } from '#backend/actions/userActions'

const Header = () => {
   const [basket, setBasket] = useState([])

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
               <Link className={`group p-0`} href={'/auth'}>
                  <LogIn className={`duration-300 group-hover:text-mini-100`} />
               </Link>
            </nav>
         </div>
      </header>
   )
}

export default Header
