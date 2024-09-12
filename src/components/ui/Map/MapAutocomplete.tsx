'use client'
import { useMapAddressStore } from '#stores/mapAddressStore'
import { Input } from '#ui/input'
import { Label } from '#ui/label'
import { useEffect, useRef } from 'react'
import { useImportLibrary } from 'react-google-map-wrapper'

const MapAutocomplete = () => {
   const { address, setAddress } = useMapAddressStore()
   const places = useImportLibrary('places')
   const inputRef = useRef<HTMLInputElement | null>(null)

   const handleGetUserAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(e.target.value)
   }

   useEffect(() => {
      if (!places || !inputRef.current) {
         console.log('Google Places API hazir deyil')
         return
      }

      const autocomplete = new places.Autocomplete(inputRef.current!)

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
         const place = autocomplete.getPlace()
         console.log('Place changed:', place)

         if (!place.geometry || !place.formatted_address) {
            console.log('Addres yoxdu')
            return
         }

         console.log('Adres yenilenir:', place.formatted_address)
         setAddress(place.formatted_address)
      })

      return () => {
         google.maps.event.clearInstanceListeners(autocomplete)
      }
   }, [places])

   return (
      <Label className={`z-20`}>
         <Input
            className="font-semibold text-blue-600"
            type="text"
            onChange={handleGetUserAddress}
            ref={inputRef}
            value={address}
            placeholder="Addresi daxil edin"
         />
      </Label>
   )
}

export default MapAutocomplete
