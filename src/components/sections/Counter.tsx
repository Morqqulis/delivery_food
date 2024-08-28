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
      await userAddToBasket('66cf65fb10760b3633230284', id, count)
      setCount(1)
   }
   return (
      <div className={`${className} flex items-center justify-between gap-2`}>
         <div className="flex gap-2 text-xl">
            <button className="rounded bg-gray-900 text-white px-2 duration-300 hover:bg-tomato-200" onClick={() => count > 0 && setCount(count - 1)}>
               -
            </button>
            <p className="w-[30px] text-center">{count}</p>
            <button className="rounded bg-gray-900 text-white px-2 duration-300 hover:bg-tomato-200" onClick={() => setCount(count + 1)}>
               +
            </button>
         </div>
         <Btn text={text} ariaLabel="Add Btn" className="px-5 py-3 w-full" onClick={addToBasket} />
      </div>
   )
}

export default Counter
