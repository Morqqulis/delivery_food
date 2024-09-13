import { useImportLibrary } from 'react-google-map-wrapper'
import { create } from 'zustand'

interface IMapAddressStore {
   address: string
   location: google.maps.LatLngLiteral
   setAddress: (address: string) => void
   setLocation: (location: google.maps.LatLngLiteral) => void
   setAllWithGeocoding: (req: google.maps.GeocoderRequest) => void
}

export const useMapStore = create<IMapAddressStore>((set) => ({
   address: '28 Mall, Baku, Azerbaijan',
   location: {
      lat: 40.37906655792881,
      lng: 49.84419047733686,
   },
   setAddress: (address: string) => set({ address }),
   setLocation: (location: google.maps.LatLngLiteral) => set({ location }),
   setAllWithGeocoding: (req: google.maps.GeocoderRequest) => {
      const { setAddress, setLocation } = useMapStore.getState()

      const geoLib = useImportLibrary('geocoding')

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
   },
}))
