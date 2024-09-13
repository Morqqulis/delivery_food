'use client'
import { useMapStore } from '#stores/mapStore'
import { Input } from '#ui/input'
import { Label } from '#ui/label'
import { useEffect, useRef } from 'react'
import { useImportLibrary } from 'react-google-map-wrapper'

const MapAutocomplete = () => {
   const { address, setAddress, setLocation } = useMapStore()
   const places: google.maps.PlacesLibrary | null = useImportLibrary('places')
   const inputRef = useRef<HTMLInputElement | null>(null)

   const handleGetUserAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(e.target.value)
   }

   useEffect(() => {
      if (!places || !inputRef.current) {
         return
      }

      const autocomplete: google.maps.places.Autocomplete = new places.Autocomplete(inputRef.current!)

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
         const place: google.maps.places.PlaceResult = autocomplete.getPlace()

         if (!place.geometry || !place.formatted_address) return

         setLocation(place.geometry.location!.toJSON())
         setAddress(place.formatted_address)
      })

      return () => {
         google.maps.event.clearInstanceListeners(autocomplete)
      }
   }, [places])

   return (
      <Input
         className="font-semibold text-blue-600 duration-300 placeholder:duration-300 focus-within:placeholder:text-opacity-0"
         type="text"
         onChange={handleGetUserAddress}
         ref={inputRef}
         value={address}
         placeholder="Addresi daxil edin"
      />
   )
}

export default MapAutocomplete
