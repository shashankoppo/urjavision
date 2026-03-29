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
          deep: '#B45309',
        },
        energy: {
          green: '#059669',
          dark: '#047857',
          deeper: '#064E3B',
          light: '#10B981',
          bright: '#34D399',
          xlight: '#D1FAE5',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'solar-spin': 'solar-spin 25s linear infinite',
        'solar-pulse': 'solar-pulse 2.5s ease infinite',
        'fade-up': 'fade-up 0.7s ease both',
        'scale-in': 'scale-in 0.5s ease both',
        'gradient-flow': 'gradient-flow 8s ease infinite',
        'orb-float': 'orb-float 12s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
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
        'gradient-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'orb-float': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '50%': { transform: 'translate(-10px, 20px) scale(0.95)' },
          '75%': { transform: 'translate(-30px, -10px) scale(1.02)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #064E3B 0%, #047857 25%, #059669 50%, #10B981 75%, #34D399 100%)',
        'gradient-hero': 'linear-gradient(160deg, #020617 0%, #0A0F1E 15%, #0F172A 30%, #1E293B 45%, #064E3B 65%, #047857 80%, #059669 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #92400E 0%, #D97706 25%, #F59E0B 50%, #FBBF24 75%, #FDE68A 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #059669 0%, #0EA5E9 35%, #8B5CF6 70%, #EC4899 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #F97316 0%, #F59E0B 30%, #EAB308 60%, #84CC16 100%)',
        'gradient-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(5,150,105,0.15), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.1), transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(14,165,233,0.08), transparent 50%), linear-gradient(180deg, #030712, #0A0F1E 50%, #0F172A)',
      },
      backgroundSize: {
        '200%': '200% 200%',
        '300%': '300% 300%',
      },
      boxShadow: {
        'green': '0 8px 30px rgba(5,150,105,0.3), 0 0 0 1px rgba(5,150,105,0.05)',
        'amber': '0 8px 30px rgba(245,158,11,0.3), 0 0 0 1px rgba(245,158,11,0.05)',
        'glow': '0 0 60px rgba(5,150,105,0.25), 0 0 120px rgba(245,158,11,0.08)',
        'green-lg': '0 12px 40px rgba(5,150,105,0.4), 0 0 20px rgba(16,185,129,0.2)',
        'amber-lg': '0 12px 40px rgba(245,158,11,0.4), 0 0 20px rgba(251,191,36,0.2)',
        'premium': '0 25px 50px -12px rgba(0,0,0,0.25)',
        'solar-beam': '0 0 80px rgba(245,158,11,0.2), 0 0 160px rgba(5,150,105,0.1)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
