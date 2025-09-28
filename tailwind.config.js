/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3E2723',
        'primary-foreground': '#FFFFFF',
        accent: '#3E2723',
        'accent-foreground': '#FFFFFF',
        background: '#FEF7E0',
        'background-foreground': '#3E2723',
        surface: '#F5F5F5',
        'surface-foreground': '#3E2723',
        text: '#3E2723',
        'text-foreground': '#FEF7E0',
        muted: '#424242',
        'muted-foreground': '#757575',
        border: '#E0E0E0',
        input: '#F5F5F5',
        ring: '#3E2723',
        // Primary Brand Colors
        'brand-forest-green': '#1B5E20',
        'brand-forest-green-foreground': '#FFFFFF',
        'brand-sage-green': '#4CAF50',
        'brand-sage-green-foreground': '#FFFFFF',
        'brand-warm-gold': '#3E2723',
        'brand-warm-gold-foreground': '#FFFFFF',
        'brand-earth-brown': '#3E2723',
        'brand-earth-brown-foreground': '#FFFFFF',
        'brand-cream': '#FEF7E0',
        'brand-cream-foreground': '#3E2723',
        'brand-stone-gray': '#F5F5F5',
        'brand-stone-gray-foreground': '#3E2723',
        // Supporting Colors
        'brand-light-sage': '#C8E6C9',
        'brand-light-sage-foreground': '#1B5E20',
        'brand-warm-white': '#FFFFFF',
        'brand-warm-white-foreground': '#3E2723',
        'brand-charcoal': '#424242',
        'brand-charcoal-foreground': '#FFFFFF',
        'brand-soft-gray': '#E0E0E0',
        'brand-soft-gray-foreground': '#3E2723',
        // Status Colors - No Orange
        success: '#4CAF50',
        error: '#DC2626',
        warning: '#3E2723',
        info: '#3E2723',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
