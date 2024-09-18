const PromotionItem: React.FC<{ title: string; value: string | number | undefined }> = ({
   title,
   value,
}): JSX.Element => {
   return value ? (
      <div className="flex gap-3">
         <p className="flex w-[100px] items-center">{title}:</p>
         <p> {value}</p>
      </div>
   ) : (
      <></>
   )
}

export default PromotionItem
