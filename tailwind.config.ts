import type { Config } from 'tailwindcss'

const config = {
   darkMode: ['class'],
   content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
   prefix: '',
   theme: {
      container: {
         center: true,
         padding: '2rem',
      },
      extend: {
         screens: {
            mxs: { max: '489.99px' },
            msm: { max: '566.99px' },
            mmd: { max: '767.99px' },
            mlg: { max: '991.99px' },
            mpc: { max: '1149.99px' },
         },

         transitionDuration: {
            400: '400ms',
         },

         colors: {
            'light-100': '#FFFFFF',
            'light-200': '#FFFAF1',
            'light-300': '#E1E1E6',
            'light-400': '#C4C4CC',
            'light-500': '#7C7C8A',
            'light-600': '#76797B',
            'light-700': '#4D585E',

            'dark-100': '#000405',
            'dark-200': '#00070A',
            'dark-300': '#000204',
            'dark-400': '#000A0F',
            'dark-500': '#000C12',
            'dark-600': '#00111A',
            'dark-700': '#001119',
            'dark-800': '#0D161B',
            'dark-900': '#0D1D25',

            'tomato-100': '#750310',
            'tomato-200': '#92000E',
            'tomato-300': '#AB222E',
            'tomato-400': '#AB4D55',

            'carrot-100': '#FBA94C',
            'mini-100': '#04D361',

            'cake-100': '#82F3FF',
            'cake-200': '#065E7C',
         },

         gradientColorStops: {
            'gradient-200': 'linear-gradient(180.00deg, rgb(9, 30, 38),rgb(0, 19, 28) 100%)',
         },

         keyframes: {
            'accordion-down': {
               from: { height: '0' },
               to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: '0' },
            },
         },
         animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
         },
      },
   },
   plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
