'use client'
import { useMapStore } from '#stores/mapStore'
import { Suspense, useEffect } from 'react'
import { AdvancedMarker, GoogleMap, GoogleMapApiLoader, PinElement, useImportLibrary } from 'react-google-map-wrapper'

const Map = () => {
   const { setAddress, location, setLocation } = useMapStore()
   const geoLib = useImportLibrary('geocoding')

   useEffect(() => {
      if (!navigator.geolocation) return

      navigator.geolocation.getCurrentPosition((position) => {
         const currentLocation: google.maps.LatLngLiteral = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
         }

         mapGeocoder({ location: currentLocation })
      })
   }, [geoLib])

   const mapGeocoder = (req: google.maps.GeocoderRequest) => {
      if (!geoLib) return
      const geocoder = new geoLib.Geocoder()

      geocoder.geocode(req, (results, status) => {
         if (status === 'OK') {
            if (!results) {
               return
            }
            setAddress(results[0].formatted_address)
            setLocation(results[0].geometry.location.toJSON())
         }
      })
   }

   const handleDragEnd = (e: any) => {
      const markerLocation = {
         lat: e.position.lat,
         lng: e.position.lng,
      }

      mapGeocoder({ location: markerLocation })
   }

   return (
      <Suspense fallback={<h3 className={`text-center text-3xl font-semibold text-tomato-200`}>Loading map...</h3>}>
         <GoogleMapApiLoader
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            language={'az'}
            suspense
            region={'az'}
            v={'beta'}
            key={'some key'}
            libraries={['maps', 'marker', 'places', 'geocoding']}
            onSuccess={() => console.log('Google Maps API yuklendi!')}
         >
            <GoogleMap
               className={`h-[500px]`}
               center={location}
               key={'random key'}
               zoom={12}
               mapOptions={{
                  // styles: mapStyles,
                  zoomControl: false,
                  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string,
                  clickableIcons: true,
                  mapTypeControl: false,
                  fullscreenControl: true,
                  streetViewControl: true,
                  rotateControl: true,
                  scaleControl: true,
               }}
            >
               <AdvancedMarker
                  gmpDraggable={true}
                  lat={location.lat}
                  lng={location.lng}
                  onDragEnd={(e) => handleDragEnd(e)}
               >
                  <PinElement scale={1.1} glyphColor={'blue'} borderColor={'blue'} background={'red'} />
               </AdvancedMarker>
            </GoogleMap>
         </GoogleMapApiLoader>
      </Suspense>
   )
}

export default Map
