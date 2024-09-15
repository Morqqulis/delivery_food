'use client'
import { authConfig } from '#configs/authConfig'
import { getServerSession, Session } from 'next-auth'
import ProfileForm from './ProfileForm'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { IUser } from '#types/index'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface IMainSection {}

const ProfileSection: React.FC = (): JSX.Element => {
   const session = useSession()
   const [hasFetched, setHasFetched] = useState(false)
   const query = useQuery({
      queryKey: ['user data for Profile Form'],
      queryFn: async () => {
         if (!session.data?.user?.email) return

         const res = await axios.get('/api/user', {
            params: { email: session.data.user.email },
         })

         return {
            name: session?.data.user?.name,
            email: session?.data.user?.email,
            ...res.data,
         }
      },

      enabled: !!session.data?.user?.email,

      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
   })

   return (
      <section className={`w-full grow`}>
         {query.isLoading && (
            <div className={`grid h-full place-items-center text-center text-4xl text-tomato-300`}>Loading...</div>
         )}
         {query.isError && (
            <div className={`grid h-full place-items-center text-center text-4xl text-tomato-300`}>Error</div>
         )}

         {query.data && (
            <>
               <h1 className={`mb-20 text-balance text-center text-3xl font-bold leading-relaxed`}>
                  Profile of <br />
                  <span className={`text-5xl text-mini-100`}>{query.data?.name}</span>
               </h1>

               <ProfileForm userData={query.data} />
            </>
         )}
      </section>
   )
}

export default ProfileSection
