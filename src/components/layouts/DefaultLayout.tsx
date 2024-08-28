import Footer from '#sections/Footer/Footer'
import Header from '#sections/Header/Header'
import Aside from '#sections/Seller/Aside/Aside'
import { IDefaultProvider } from '#types/index'

const DefaultLayout: React.FC<IDefaultProvider> = ({ children, full = true }: IDefaultProvider): JSX.Element => {
   return (
      <>
         <div className={`flex min-h-full flex-col`}>
            {full ? (
               <>
                  <Header />
                  {children}
                  <Footer />
               </>
            ) : (
               <div className="flex w-full gap-2">
                  <div className="w-[20%]">
                     <Aside />
                  </div>
                  <div className="w-[80%]">{children}</div>
               </div>
            )}
         </div>
      </>
   )
}

export default DefaultLayout
