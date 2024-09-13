import Btn from '#ui/Btn/Btn'
import CustomDialog from '#ui/CustomDialog/CustomDialog'
import Map from './Map'
import MapAutocomplete from './MapAutocomplete'

interface IMapDialog {}

const MapDialog = () => {
   return (
      <CustomDialog>
         <MapAutocomplete />
         <Map />
         <Btn
            className={`mx-auto w-full max-w-[50%] !bg-mini-100 py-6 !text-[20px] !font-semibold !text-black`}
            text={'Tesdiq et'}
         />
      </CustomDialog>
   )
}

export default MapDialog
