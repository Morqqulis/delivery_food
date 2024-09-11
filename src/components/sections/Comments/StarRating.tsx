import React from 'react'

const StarRating: React.FC<{ rating: number; onRatingChange?: (rating: number) => void; size: string }> = ({
   rating,
   onRatingChange,
   size,
}) => {
   const handleRating = (newRating: number) => {
      if (onRatingChange) {
         onRatingChange(newRating)
      }
   }

   return (
      <div className="flex">
         {[1, 2, 3, 4, 5].map((star) => (
            <svg
               key={star}
               onClick={() => handleRating(star)}
               xmlns="http://www.w3.org/2000/svg"
               fill={star <= rating ? 'yellow' : 'gray'}
               viewBox="0 0 24 24"
               width={size}
               height={size}
               className="cursor-pointer"
            >
               <path d="M12 .587l3.668 7.431 8.332 1.151-6 5.797 1.42 8.267L12 18.896l-7.42 4.337 1.42-8.267-6-5.797 8.332-1.151z" />
            </svg>
         ))}
      </div>
   )
}

export default StarRating
