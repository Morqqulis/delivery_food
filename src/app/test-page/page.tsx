import DefaultLayout from '#layouts/DefaultLayout'
import Btn from '#ui/Btn/Btn'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#ui/dialog'
import Map from '#ui/Map/Map'
import MapAutocomplete from '#ui/Map/MapAutocomplete'
import { NextPage } from 'next'

const TestPage: NextPage = () => {
   return (
      <DefaultLayout full={false}>
         <main>
            <Dialog>
               <DialogTrigger asChild>
                  <Btn type={'button'} text={'Open Map'} />
               </DialogTrigger>
               <DialogContent className={`map-content group max-w-3xl`}>
                  <DialogHeader>
                     <DialogTitle className={`text-center text-black`}>Gozel Xerite</DialogTitle>
                     <DialogDescription className={`text-center text-xl`}>Desctiption</DialogDescription>
                     <MapAutocomplete />
                  </DialogHeader>
                  <Map />
               </DialogContent>
            </Dialog>
         </main>
      </DefaultLayout>
   )
}

export default TestPage
