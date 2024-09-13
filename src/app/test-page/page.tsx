import DefaultLayout from '#layouts/DefaultLayout'
import Btn from '#ui/Btn/Btn'
import CustomDialog from '#ui/CustomDialog/CustomDialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#ui/dialog'
import Map from '#ui/Map/Map'
import MapAutocomplete from '#ui/Map/MapAutocomplete'
import { NextPage } from 'next'

const TestPage: NextPage = () => {
   return (
      <DefaultLayout full={false}>
         <main>
            <CustomDialog>
               <MapAutocomplete />
               <Map />
            </CustomDialog>
         </main>
      </DefaultLayout>
   )
}

export default TestPage
