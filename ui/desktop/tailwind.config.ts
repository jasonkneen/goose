/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cash Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.8125rem', { lineHeight: '1.25rem' }],
        'base': ['0.875rem', { lineHeight: '1.5rem' }],
        'lg': ['1rem', { lineHeight: '1.75rem' }],
        'xl': ['1.125rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.25rem', { lineHeight: '2rem' }],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        loader: {
          '0%': { left: 0, width: 0 },
          '50%': { left: 0, width: '100%' },
          '100%': { left: '100%', width: 0 },
        },
        popin: {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        appear: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        flyin: {
          '0%': { opacity: 0, transform: 'translate(-300%, 300%)' },
          '100%': { opacity: 1, transform: 'translate(0, 0)' },
        },
        wind: {
          '0%': { transform: 'translate(0, 0)' },
          '99.99%': { transform: 'translate(-100%, 100%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'shimmer-pulse': 'shimmer 4s ease-in-out infinite',
        'gradient-loader': 'loader 750ms ease-in-out infinite',
      },
      colors: {
        // Background colors
        bgApp: 'var(--background-app)',
        bgSubtle: 'var(--background-subtle)',
        bgStandard: 'var(--background-standard)',
        bgProminent: 'var(--background-prominent)',

        // Border colors
        borderSubtle: 'var(--border-subtle)',
        borderStandard: 'var(--border-standard)',

        // Text colors
        textProminent: 'var(--text-prominent)',
        textStandard: 'var(--text-standard)',
        textSubtle: 'var(--text-subtle)',
        textPlaceholder: 'var(--text-placeholder)',

        // Icon colors
        iconProminent: 'var(--icon-prominent)',
        iconStandard: 'var(--icon-standard)',
        iconSubtle: 'var(--icon-subtle)',
        iconExtraSubtle: 'var(--icon-extra-subtle)',

        // Custom colors
        slate: 'var(--slate)',
        blockTeal: 'var(--block-teal)',
        blockOrange: 'var(--block-orange)',

        // Dark mode specific colors
        'dark-grey-15': '#1E1E1E',
        'dark-grey-25': '#1a1f28',
        'dark-grey-30': '#252b33',
        'dark-grey-40': '#363636',
        'dark-grey-45': '#8b949e',
        'dark-grey-60': '#c9d1d9',
        'dark-grey-90': '#f0f6fc',
      },
      // Add box shadow utilities
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'dark': '0 1px 3px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
    },
  },
};
