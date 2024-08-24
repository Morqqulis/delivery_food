import Footer from '#sections/Footer/Footer'
import Header from '#sections/Header/Header'
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
               <>{children}</>
            )}
         </div>
      </>
   )
}

export default DefaultLayout
