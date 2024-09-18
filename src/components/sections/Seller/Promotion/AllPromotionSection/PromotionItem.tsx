interface IPromotionItem {}

const PromotionItem: React.FC<{ title: string; value: string }> = ({ title, value }): JSX.Element => {
   return (
      <div className="flex gap-3">
         <p className="flex w-[100px] items-center">{title}:</p>
         <p> {value}</p>
      </div>
   )
}

export default PromotionItem
