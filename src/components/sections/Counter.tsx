'use client'
import { userAddToBasket } from '#backend/actions/userActions'
import Btn from '#ui/Btn/Btn'

interface CounterProps {
   count: number
   setCount: (count: number) => void
   text: string
   id: string
   className?: string
}

const Counter: React.FC<CounterProps> = ({ count, setCount, text, id, className }): JSX.Element => {
   const addToBasket = async () => {
      await userAddToBasket('66cdd4c19990206c58574b69', id, count)
      setCount(1)
   }
   return (
      <div className={`${className} flex items-center justify-between gap-2`}>
         <div className="flex gap-2 text-xl">
            <button className="cursor-pointer" onClick={() => count > 0 && setCount(count - 1)}>
               -
            </button>
            <p className="w-[30px] text-center">{count}</p>
            <button className="cursor-pointer" onClick={() => setCount(count + 1)}>
               +
            </button>
         </div>
         <Btn text={text} ariaLabel="Add Btn" className="px-5 py-3" onClick={addToBasket} />
      </div>
   )
}

export default Counter
