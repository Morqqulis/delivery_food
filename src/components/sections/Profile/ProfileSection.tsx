import { authConfig } from '#configs/authConfig'
import { getServerSession, Session } from 'next-auth'
import Image from 'next/image'
import ProfileForm from './ProfileForm'

interface IMainSection {}

const ProfileSection: React.FC = async (): Promise<JSX.Element> => {
   const session: Session | null = await getServerSession(authConfig)

   return (
      <section className={`py-20`}>
         <div className="container">
            <h1 className={`mb-20 text-balance text-center text-3xl font-bold leading-relaxed`}>
               Profile of <br />
               <span className={`text-5xl text-mini-100`}>{session?.user?.name}</span>
            </h1>
            <ProfileForm sessionUser={session?.user ? session?.user : null} />
         </div>
      </section>
   )
}

export default ProfileSection
