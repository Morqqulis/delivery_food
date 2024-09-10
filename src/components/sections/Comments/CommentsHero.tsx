import StarRating from './StarRating'
import AddComment from './AddComment'
import { IComment } from '#types/index'
import '../../../styles/scrollbar.scss'
const CommentsHero: React.FC<{ prodId: string; comments: IComment[] | undefined }> = ({
   prodId,
   comments,
}): JSX.Element => {
    
   const averageRating = comments?.length
      ? comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length
      : 0

   return (
      <div className="scrollbar-custom max-h-[500px] w-[90%] overflow-auto rounded-lg bg-[#162447] p-4 shadow-md">
         <div className="flex flex-col border-b pb-4">
            <h2 className="mb-4 text-center text-2xl font-semibold">Comments</h2>
            <div className="mb-3 flex justify-between px-4">
               <div>
                  <h3 className="text-lg font-medium">Average Rating: {averageRating.toFixed(1)}</h3>
                  <StarRating rating={Math.round(averageRating)} size={'30'} />
               </div>

               <AddComment prodId={prodId} />
            </div>
         </div>

         <div className="mb-6">
            {comments?.map((comment, index) => (
               <div key={comment.text + index} className="border-b p-3">
                  <div className="mb-1 flex items-center gap-3">
                     <p>{comment.name}</p>
                     <StarRating rating={comment.rating} size={'15'} />
                     <p className="text-sm">{comment.date.toString()}</p>
                  </div>
                  <p className="mt-2 font-bold">{comment.text}</p>
               </div>
            ))}
         </div>
      </div>
   )
}

export default CommentsHero
