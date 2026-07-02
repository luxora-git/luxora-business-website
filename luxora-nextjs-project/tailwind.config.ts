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
        luxora: {
          navy: '#0A1F44',
          cream: '#F5F0E6',
          gold: '#D4AF37',
          forest: '#1A472A',
          gray: '#E8E8E8',
          charcoal: '#111111',
        }
      },
      spacing: {
        'xxl': '120px',
        'xl': '80px',
        'l': '60px',
        'm': '40px',
        's': '24px',
        'xs': '16px',
        'xxs': '8px',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        'hero-desktop': '72px',
        'hero-mobile': '48px',
        'heading-desktop': '48px',
        'heading-mobile': '32px',
        'subheading-desktop': '20px',
        'subheading-mobile': '16px',
        'body-desktop': '18px',
        'body-mobile': '16px',
        'small-desktop': '16px',
        'small-mobile': '14px',
        'caption-desktop': '12px',
        'caption-mobile': '10px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-in-out',
        'slide-down': 'slideDown 0.6s ease-in-out',
        'scale-in': 'scaleIn 0.6s ease-in-out',
        'hover-grow': 'hoverGrow 0.3s ease-in-out',
        'hover-gold': 'hoverGold 0.3s ease-in-out',
        'gallery-shimmer': 'galleryShimmer 1.8s ease-in-out infinite',
        'gallery-ken-burns': 'galleryKenBurns 26s ease-in-out infinite alternate',
      },
      keyframes: {
        galleryShimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        galleryKenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        hoverGrow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        hoverGold: {
          '0%': { backgroundColor: '#0A1F44' },
          '100%': { backgroundColor: '#D4AF37' },
        },
      },
    },
  },
  plugins: [],
}
export default config