import { cookieGetLiked, cookieUpdateLiked } from '#backend/actions/cookieLiked'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'


const LikeHeart: React.FC<{ id: string }> = ({ id }): JSX.Element => {
   const [like, setLike] = useState(false)
   async function handleClick() {
      await cookieUpdateLiked(id)
      setLike(!like)
   }

   useEffect(() => {
      ;(async () => {
         const likedProducts = await cookieGetLiked()
         setLike(likedProducts.includes(id))
      })()
   }, [])

   return (
      <Heart
         className={`cursor-pointer ${like ? 'fill-red-500 text-red-500' : 'fill-transparent'} absolute right-2 top-2`}
         onClick={handleClick}
      />
   )
}

export default LikeHeart
