import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        roboto: ['var(--font-roboto)'],
      },
      colors: {
        'btn': '#19CC85',
        'btnDark': '#071A52',

        'transparentBgGreen': 'rgba(25,204,132,0.1)',


        'gray': '#e7e7e5',

        'red':'#ff2d55',




        'bgDark': '#071A52',
        'bgLight': '#F2F2F2',

        'paraText': '#868788',
        'headerText': '#092C4C',

        'darkText': '#112A46',

        'primary': '#FF9F43',
        'primary-hover': '#1B2850',

        'secondary': '#092C4C',

        'tableBorder': '#dbe0e6',

        'tableBody': '#495057'
        
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config