import { authConfig } from '#configs/authConfig'
import { getServerSession, Session } from 'next-auth'
import ProfileForm from './ProfileForm'
import axios from 'axios'

interface IMainSection {}

const ProfileSection: React.FC = async (): Promise<JSX.Element> => {
   const session: Session | null = await getServerSession(authConfig)
   const res = await axios.post('http://localhost:3000/api/user', { email: session?.user?.email })
   const userData = await res.data
   const user = {
      name: session?.user?.name,
      email: session?.user?.email,
      ...userData,
   }

   return (
      <section className={`py-20`}>
         <div className="container">
            <h1 className={`mb-20 text-balance text-center text-3xl font-bold leading-relaxed`}>
               Profile of <br />
               <span className={`text-5xl text-mini-100`}>{session?.user?.name}</span>
            </h1>
            <ProfileForm userData={user ? user : null} />
         </div>
      </section>
   )
}

export default ProfileSection
