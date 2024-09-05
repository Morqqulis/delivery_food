import { cookieGetBasket } from '#backend/actions/cookieBasketActions'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
   const basket = await cookieGetBasket()
   return NextResponse.json(basket)
}

export async function POST(req: NextRequest) {
   const { productId, quantity } = await req.json()

   let basket = await cookieGetBasket()
   const existingItem = basket.find((item) => item.product === productId)

   if (existingItem) {
      existingItem.quantity += quantity
   } else {
      basket.push({ product: productId, quantity })
   }

   const response = NextResponse.json(basket)
   response.cookies.set('basket', JSON.stringify(basket), {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
   })

   return response
}
