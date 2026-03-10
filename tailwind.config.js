/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        solar: {
          yellow: '#F59E0B',
          amber: '#FBBF24',
          glow: '#FDE68A',
        },
        energy: {
          green: '#059669',
          dark: '#047857',
          light: '#10B981',
          xlight: '#D1FAE5',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'solar-spin': 'solar-spin 25s linear infinite',
        'solar-pulse': 'solar-pulse 2.5s ease infinite',
        'fade-up': 'fade-up 0.7s ease both',
        'scale-in': 'scale-in 0.5s ease both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'solar-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'solar-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(5,150,105,0.5)' },
          '50%': { boxShadow: '0 0 0 16px rgba(5,150,105,0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #047857 0%, #059669 50%, #10B981 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0A0F1E 0%, #0F2744 30%, #064E3B 70%, #047857 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #FBBF24 100%)',
      },
      boxShadow: {
        'green': '0 8px 30px rgba(5,150,105,0.25)',
        'amber': '0 8px 30px rgba(245,158,11,0.25)',
        'glow': '0 0 40px rgba(5,150,105,0.3), 0 0 80px rgba(245,158,11,0.1)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
