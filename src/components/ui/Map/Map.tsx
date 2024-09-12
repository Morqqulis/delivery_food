'use client'
import { Suspense, useEffect, useState } from 'react'
import { AdvancedMarker, GoogleMap, GoogleMapApiLoader, PinElement, useImportLibrary } from 'react-google-map-wrapper'

const Map = () => {
   const [address, setAddress] = useState('Baku, 28 Mall')
   const [userLocaltion, setUserLocaltion] = useState<google.maps.LatLngLiteral>({
      lat: 40.37906655792881,
      lng: 49.84419047733686,
   })
   const geocoder = useImportLibrary('geocoding')

   useEffect(() => {
      const handleGetUserGeolocation = () => {
         navigator.geolocation.getCurrentPosition((position) => {
            setUserLocaltion({
               lat: position.coords.latitude,
               lng: position.coords.longitude,
            })
         })
      }

      handleGetUserGeolocation()
      if (!geocoder) return
      console.log(geocoder)
   }, [])

   const handleDragEnd = (e: any) => {
      const position = {
         lat: e.position.lat,
         lng: e.position.lng,
      }

      setUserLocaltion(position)

      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: position }, (results, status) => {
         if (!results) return

         console.log(results[0].formatted_address)

         if (status === 'OK') {
            if (results[0]) {
               setAddress(results[0].formatted_address)
            } else {
               console.log('Bura haradi ay qa ?')
            }
         } else {
            console.log(`Geocoder xoddanmadi =) status: ${status}`)
         }
      })
   }

   const handleGetUserAddress = (e: any) => {
      // const
   }

   return (
      <>
         <Suspense
            fallback={
               <h3 className={`text-center text-3xl font-semibold text-tomato-200`}>
                  Ya internetin pisdi ya da Google tormuzdu. Gozleyek - belke acildi =) <br />
                  Loading map...
               </h3>
            }
         >
            <GoogleMapApiLoader
               apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
               language={'az'}
               suspense
               region={'Baku'}
               v={'beta'}
               key={'some key'}
               libraries={['maps', 'marker', 'places', 'geocoding']}
            >
               <GoogleMap
                  className={`h-[500px] -z-[1]`}
                  center={userLocaltion}
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
                     lat={userLocaltion.lat}
                     lng={userLocaltion.lng}
                     onDragEnd={(e) => handleDragEnd(e)}
                  >
                     <PinElement scale={1.5} background={'black'} glyphColor={'red'} borderColor={'red'} />
                  </AdvancedMarker>
               </GoogleMap>
            </GoogleMapApiLoader>
         </Suspense>
      </>
   )
}

export default Map

// const CustomMap = () => {
//    const [userLocaltion, setUserLocaltion] = useState<google.maps.LatLngLiteral>({
//       lat: 0,
//       lng: 0,
//    })

//    useEffect(() => {
//       navigator.geolocation.getCurrentPosition((position) => {
//          setUserLocaltion({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//          })
//       })
//    }, [])

//    return (
//       <GoogleMap
//          className={`h-[500px]`}
//          center={userLocaltion}
//          zoom={12}
//          mapOptions={{
//             styles: mapStyles,
//          }}
//       ></GoogleMap>
//    )
// }
