import { userGetAll, userGetById } from '#backend/actions/userActions'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
   const result = await userGetAll()

   return NextResponse.json(result || 'No data')
}

export async function POST(req: NextRequest, res: NextResponse) {
   const id = await req.json()

   const result = await userGetById(id)

   return NextResponse.json(result)
}

// export async function PATCH(req: NextRequest, res: NextResponse) {
//    getUserById('')
// }

// export async function DELETE(req: NextRequest, res: NextResponse) {
//    getUserById('')
// }



