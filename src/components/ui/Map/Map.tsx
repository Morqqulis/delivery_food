interface IMap {}
import Btn from '#ui/Btn/Btn'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#ui/dialog'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { ReactNode, useEffect, useState } from 'react'
import { mapStyles } from './styles'

const Map = () => {
   const [userLocaltion, setUserLocaltion] = useState<google.maps.LatLngLiteral>({
      lat: 0,
      lng: 0,
   })

   const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement>()
   const [map, setMap] = useState<google.maps.Map | null>(null)
   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
      language: 'az',
      version: 'weekly',
   })

   useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
         setUserLocaltion({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
         })
      })

      if (isLoaded) {
         ;(async () => {
            const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary
            const newMarker = new AdvancedMarkerElement({
               position: userLocaltion,
               map: map,
            })

            setMarker(newMarker)
         })()
      }

      console.log(marker)
   }, [])

   return isLoaded ? (
      <div className={`light`}>
         <Dialog>
            <DialogTrigger asChild>
               <Btn type={'button'} text={'Open Map'} />
            </DialogTrigger>
            <DialogContent className={`max-w-3xl`}>
               <DialogHeader>
                  <DialogTitle className={`text-center text-black`}>Gozel Xerite</DialogTitle>
                  <DialogDescription className={`text-center text-xl`}>Adresivi sec</DialogDescription>
               </DialogHeader>
               <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '500px' }}
                  center={userLocaltion}
                  zoom={12}
                  onUnmount={() => setMap(null)}
                  onLoad={(map: google.maps.Map) => setMap(map)}
                  clickableIcons={true}
                  options={{
                     zoomControl: true,
                     streetViewControl: true,
                     mapTypeControl: true,
                     fullscreenControl: true,
                     styles: mapStyles,
                  }}
               >
                  <Marker position={userLocaltion} />
               </GoogleMap>
            </DialogContent>
         </Dialog>
      </div>
   ) : (
      <div>
         <p>Loading...</p>
      </div>
   )
}

export default Map
