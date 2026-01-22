import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          pink: {
            light: '#F8D7DA',
            medium: '#F5C6CB',
            dark: '#E8A4B0',
          },
          beige: '#F5F5DC',
          gold: '#D4AF37',
          cream: '#FFF8E7',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        display: ['var(--font-display)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config

