import Logo from '#ui/Logo'
import Link from 'next/link'

const Footer = () => {
   return (
      <footer className={`bg-dark-600 py-6`}>
         <div className="container">
            <div className={`flex items-center justify-between gap-2 sm:flex-col sm:justify-center`}>
               <Logo
                  className={`flex items-center gap-4 text-[1.5rem] leading-[1.75rem] text-light-700 duration-300 ease-in hover:text-mini-100`}
                  iconClassName={`fill-light-700`}
               />
               <div className="flex gap-3">
                  <Link href={'/seller'} className={`leading-[1.6] text-light-400`}>
                     Seller
                  </Link>
                  <Link href={'/delivery'} className={`leading-[1.6] text-light-400`}>
                     Delivery
                  </Link>
                  <Link href={'/filtered/categories'} className={`leading-[1.6] text-light-400`}>
                     filter page
                  </Link>
                  <Link href={'/test-page'} className={`leading-[1.6] text-light-400`}>
                     Test Page
                  </Link>
               </div>

               <span className={`leading-[1.6] text-light-400`}>© 2023 - Todos os direitos reservados.</span>
            </div>
         </div>
      </footer>
   )
}

export default Footer
