'use server'
import { cookies } from 'next/headers'

//----------------------------------------------
// Yaradmag
export async function setCookie() {
   //  cookie objecti elde edirik.
   const cookieStore = cookies()

   // Cookie-ye yeni deyer veririrk.
   cookieStore.set('cookieName', 'cookieValue', {
      httpOnly: true, // JavaScript ile cookie-ni oxumagin icazesini deyisdir. true - yani mudaxile ede bilmesinler.
      secure: true, // Cookie ancag HTTPS - ile sorgu atmag olsun.
      path: '/', // Butun saytda cookie-ye el catsin.
      sameSite: 'strict', // CSRF-ataklardan qorunmag ucun.
   })

   // her hansi cavabi qaytarmag, eger action-dirsa.
   return { message: 'Cookie Set olundu' }
}
//----------------------------------------------

//----------------------------------------------
// Yenilemek
export async function updateCookie() {
   const cookieStore = cookies()

   // Yani hemen .set metodunu istifade ede bilerik.
   cookieStore.set('cookieName', 'newCookieValue', {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
   })

   return { message: 'Cookie yenilendi' }
}
//----------------------------------------------

//----------------------------------------------
//  Silmek
export async function deleteCookie() {
   const cookieStore = cookies()
   cookieStore.delete('cookieName')

   return { message: 'Cookie pozuldu' }
}

//----------------------------------------------

//----------------------------------------------
// Marwrutda isttifade misali.
// app/api/cookies/set/route.ts
//----------------------------------------------

// Funksiyalarin apide istifade misali.
// Bu Bize oqeder de lazim deyil
import { NextResponse } from 'next/server'
// import { cookies } from "next/headers";

export async function GET() {
   const cookieStore = cookies()
   cookieStore.set('userToken', 'abc123', {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
   })

   return NextResponse.json({ message: 'Cookie Elave edildi' })
}
//----------------------------------------------
