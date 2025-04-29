import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Para que detecte tus archivos
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config