/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        surface: '#12121A',
        accent: '#FF4444',
        'accent-secondary': '#FF8C00',
        safe: '#22C55E',
        'text-primary': '#F1F1F1',
        'text-muted': '#8888AA',
        border: '#1E1E2E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(255,68,68,0.15)',
        'glow-strong': '0 0 40px rgba(255,68,68,0.25)',
        'glow-accent': '0 0 30px rgba(255,68,68,0.3)',
        'glow-safe': '0 0 20px rgba(34,197,94,0.2)',
        'glow-amber': '0 0 20px rgba(255,140,0,0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
