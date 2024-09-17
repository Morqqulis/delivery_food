interface CounterProps {
   count: number
   setCount: (count: number) => void
   className?: string
}

const Count: React.FC<CounterProps> = ({ count, setCount, className }): JSX.Element => {
   return (
      <div className={`${className} flex gap-2 text-xl`}>
         <button
            className="rounded bg-gray-900 px-2 text-white duration-300 hover:bg-tomato-200"
            type={'button'}
            aria-label={'decrease count Btn'}
            onClick={() => count > 1 && setCount(count - 1)}
         >
            -
         </button>
         <p className="w-[30px] text-center">{count}</p>
         <button
            className="rounded bg-gray-900 px-2 text-white duration-300 hover:bg-tomato-200"
            type={'button'}
            aria-label={'increase count Btn'}
            onClick={() => setCount(count + 1)}
         >
            +
         </button>
      </div>
   )
}

export default Count
