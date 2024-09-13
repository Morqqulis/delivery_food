'use client'
import Logo from '#ui/Logo'
import { LogIn } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from './Header.module.scss'
import HeaderBasketBtn from './HeaderBasketBtn'
import HeaderSearch from './HeaderSearch'
import HeaderUserDropdown from './HeaderUserDropdown'
import CategorySheet from '#sections/Category/CategorySheet'

const Header = () => {
   const session = useSession()

   return (
      <header className={`${styles.header}`}>
         <div className="container">
            <nav className={`flex items-center justify-between gap-8`}>
               <Logo className={styles.logo} />
               <HeaderSearch />
               <CategorySheet />
               <HeaderBasketBtn />
               {session.status === 'loading' ? (
                  <div>Loading...</div>
               ) : session.status === 'unauthenticated' ? (
                  <Link className={`group p-0`} href={'/auth'}>
                     <LogIn className={`duration-300 group-hover:text-mini-100`} />
                  </Link>
               ) : (
                  <HeaderUserDropdown userData={session?.data?.user} />
               )}
            </nav>
         </div>
      </header>
   )
}

export default Header
