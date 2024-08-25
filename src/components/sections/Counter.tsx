interface CounterProps {
    count: number
    setCount: (count: number) => void
}

const Counter: React.FC<CounterProps>= ({ count, setCount }): JSX.Element => {
   return (
      <div className="flex gap-2 text-xl">
         <button className="cursor-pointer" onClick={() => count > 0 && setCount(count - 1)}>
            -
         </button>
         <p className="w-[30px] text-center">{count}</p>
         <button className="cursor-pointer" onClick={() => setCount(count + 1)}>
            +
         </button>
      </div>
   )
}

export default Counter
