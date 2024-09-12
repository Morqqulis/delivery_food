import Footer from '#sections/Footer/Footer'
import Header from '#sections/Header/Header'
import Aside from '#sections/Seller/Aside/Aside'
import { IDefaultLayout } from '#types/index'

const DefaultLayout: React.FC<IDefaultLayout> = ({
   children,
   full = true,
   aside = false,
}: IDefaultLayout): JSX.Element => {
   return (
      <>
         <div className={`flex min-h-full flex-col overflow-x-clip`}>
            {full ? (
               <>
                  <Header />
                  {children}
                  <Footer />
               </>
            ) : aside ? (
               <div className="flex w-full gap-2">
                  <div className="w-[20%]">
                     <Aside />
                  </div>
                  <div className="w-[80%]">{children}</div>
               </div>
            ) : (
               <>{children}</>
            )}
         </div>
      </>
   )
}

export default DefaultLayout
