import Btn from '#ui/Btn/Btn'
import Logo from '#ui/Logo'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import styles from './Header.module.scss'
import HeaderSearch from './HeaderSearch'

const Header = () => {
   return (
      <header className={`${styles.header}`}>
         <div className="container">
            <nav className={`flex items-center gap-8 justify-between`}>
               <Logo className={styles.logo} />
               <HeaderSearch />
               <Btn className={`px-11 py-2`} text={'Orders (0)'} type={'button'} ariaLabel={'Orders Btn'}  href='/basket' />
               <Link className={`group p-0`} href={'/auth'}>
                  <LogIn className={`group-hover:text-mini-100 duration-300`} />
               </Link>
            </nav>
         </div>
      </header>
   )
}

export default Header
