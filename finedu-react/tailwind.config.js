const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // Use class strategy to allow manual toggle via a 'dark' class on <html>
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Map "primary" to teal to match existing tones used in the app
        primary: colors.teal,
      },
      boxShadow: {
        'soft': '0 4px 20px -6px rgba(15, 23, 42, 0.08)',
        'soft-lg': '0 12px 30px -10px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'radial-primary': 'radial-gradient(60% 60% at 100% 0%, rgba(45, 212, 191, 0.18) 0%, rgba(255,255,255,0) 60%)',
        'radial-primary-left': 'radial-gradient(60% 60% at 0% 0%, rgba(45, 212, 191, 0.14) 0%, rgba(255,255,255,0) 60%)',
        // Dark variants with a deeper top shade
        'radial-primary-dark': 'radial-gradient(60% 60% at 100% 0%, rgba(13, 148, 136, 0.20) 0%, rgba(2,6,23,0) 60%)',
        'radial-primary-left-dark': 'radial-gradient(60% 60% at 0% 0%, rgba(13, 148, 136, 0.18) 0%, rgba(2,6,23,0) 60%)',
      },
      borderRadius: {
        'xl2': '1rem',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};


