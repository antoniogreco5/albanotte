/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        alb: {
          black: '#0B0B0B',
          charcoal: '#141412',
          'warm-dark': '#13130F',
          surface: '#161614',
          'off-white': '#F2F0EA',
          'off-white-dim': 'rgba(242, 240, 234, 0.65)',
          stone: '#F4F2ED',
          olive: '#5C6B4F',
          'olive-glow': 'rgba(92, 107, 79, 0.4)',
          'muted-red': '#8B3A3A',
          muted: '#999590',
        },
        // Dynamic blend accent — overridden per product page via CSS variable
        accent: 'var(--accent, #5C6B4F)',
      },
      fontFamily: {
        heading: ['var(--font-oswald)', 'Oswald', 'Impact', 'Arial Narrow', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'DM Sans', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Hero scale
        'hero-xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'hero-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        // Section headings
        'section-xl': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'section-lg': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1' }],
        // Body scale
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'body-xs': ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      borderRadius: {
        'alb': '2px',
      },
      boxShadow: {
        'sticker': '2px 3px 0 rgba(0,0,0,0.3)',
        'sticker-hover': '4px 6px 0 rgba(0,0,0,0.4)',
        'card': '0 4px 20px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5)',
      },
      transitionTimingFunction: {
        'alb': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'grain': 'grain 0.5s steps(1) infinite',
        'fade-up': 'fadeUp 0.6s ease-out both',
        'sticker-in': 'stickerIn 0.5s ease-out both',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        stickerIn: {
          from: { opacity: '0', transform: 'scale(0.9) rotate(0deg)' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
