import { authConfig } from '#configs/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

interface IMainSection {}

const UserMainSection: React.FC = async (): Promise<JSX.Element> => {
   const session = await getServerSession(authConfig)

   return (
      <section className={`py-20`}>
         <div className="container">
            <h1 className={`mb-20 text-balance text-center text-3xl font-bold leading-relaxed`}>
               Profile of <br />
               <span className={`text-5xl text-mini-100`}>{session?.user?.name}</span>
            </h1>
            {session?.user?.image && (
               <Image
                  className={`mx-auto rounded-xl`}
                  src={session.user.image}
                  alt={'User image'}
                  width={300}
                  height={300}
               />
            )}
         </div>
      </section>
   )
}

export default UserMainSection
