import Logo from '#ui/Logo'

const Footer = () => {
   return (
      <footer className={`bg-dark-600 py-6`}>
         <div className="container">
            <div className={`flex items-center justify-between gap-2 sm:flex-col sm:justify-center`}>
               <Logo
                  className={`text-light-700 hover:text-mini-100 flex items-center gap-4 text-[1.5rem] leading-[1.75rem] duration-300 ease-in`}
                  iconClassName={`fill-light-700`}
               />
               <span className={`text-light-400 leading-[1.6]`}>© 2023 - Todos os direitos reservados.</span>
            </div>
         </div>
      </footer>
   )
}

export default Footer
