import UserAsideNav from './UserAsideNav'

interface IUserAside {}

const UserAside = () => {
   return (
      <aside className={`h-full w-full max-w-sm rounded-xl border px-2 py-4`}>
         <UserAsideNav />
      </aside>
   )
}

export default UserAside
