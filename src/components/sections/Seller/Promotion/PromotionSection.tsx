interface IPromotionSection {}
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#ui/tabs'
import AllPromotionSections from './AllPromotionSection/AllPromotionSections'
import CreatePromotionSection from './CreatePromotionSection'

const PromotionSection: React.FC = (): JSX.Element => {
   return (
      <div className="flex h-screen w-full justify-center bg-gray-900 p-14">
         <div className="flex h-full w-full flex-col gap-2">
            <Tabs defaultValue="all" className="h-full w-full">
               <TabsList className="">
                  <TabsTrigger value="all" className="data-[state=active]:bg-slate-500 data-[state=active]:text-white">
                     All Promotions
                  </TabsTrigger>
                  <TabsTrigger
                     value="create"
                     className="data-[state=active]:bg-slate-500 data-[state=active]:text-white"
                  >
                     Create Promotions
                  </TabsTrigger>
               </TabsList>
               <TabsContent value="all" className="h-full w-full">
                  <AllPromotionSections />
               </TabsContent>
               <TabsContent value="create" className="h-full w-full">
                  <CreatePromotionSection />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   )
}

export default PromotionSection
