export { default } from 'next-auth/middleware'

export const config = {
   matcher: ['/profile', '/user', '/protected/:path*', '/api/:path*'],
}
