import { Poppins, Roboto } from 'next/font/google'

const primaryFont = Poppins({ subsets: ['latin'], weight: ['300', '400', '700'] })
const secondaryFont = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })
export { primaryFont, secondaryFont }
