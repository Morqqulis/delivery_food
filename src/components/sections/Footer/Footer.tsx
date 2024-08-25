import Logo from '#ui/Logo'

const Footer = () => {
   return (
      <footer className={`bg-dark-600 py-6`}>
         <div className="container">
            <div className={`flex items-center justify-between gap-2`}>
               <Logo
                  className={`text-light-700 hover:text-mini-100 flex items-center gap-4 duration-300 ease-in`}
                  iconClassName={`fill-light-700`}
               />
               <span className={`text-light-400`}>© 2023 - Todos os direitos reservados.</span>
            </div>
         </div>
      </footer>
   )
}

export default Footer
