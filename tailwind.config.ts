import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cores baseadas na logo 3DBenchy Bros
        background: {
          DEFAULT: '#0a0a0a',
          secondary: '#1a1a1a',
          tertiary: '#333333',
        },
        foreground: {
          DEFAULT: '#ffffff',
          secondary: '#cccccc',
          muted: '#666666',
        },
        primary: {
          DEFAULT: '#00ffff', // Ciano brilhante
          50: '#e6ffff',
          100: '#ccffff',
          200: '#99ffff',
          300: '#66ffff',
          400: '#33ffff',
          500: '#00ffff',
          600: '#00cccc',
          700: '#009999',
          800: '#006666',
          900: '#003333',
        },
        secondary: {
          DEFAULT: '#ff00ff', // Magenta vibrante
          50: '#ffe6ff',
          100: '#ffccff',
          200: '#ff99ff',
          300: '#ff66ff',
          400: '#ff33ff',
          500: '#ff00ff',
          600: '#cc00cc',
          700: '#990099',
          800: '#660066',
          900: '#330033',
        },
        accent: {
          DEFAULT: '#00ff00', // Verde limão
          50: '#e6ffe6',
          100: '#ccffcc',
          200: '#99ff99',
          300: '#66ff66',
          400: '#33ff33',
          500: '#00ff00',
          600: '#00cc00',
          700: '#009900',
          800: '#006600',
          900: '#003300',
        },
        neon: {
          orange: '#ff6600',
          pink: '#ff3399',
          yellow: '#ffff00',
          blue: '#0066cc',
          purple: '#9900ff',
        },
        border: '#333333',
        input: '#1a1a1a',
        ring: '#00ffff',
        destructive: {
          DEFAULT: '#ff0066',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#1a1a1a',
          foreground: '#666666',
        },
        popover: {
          DEFAULT: '#0a0a0a',
          foreground: '#ffffff',
        },
        card: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'monospace'],
        mono: ['Roboto Mono', 'monospace'],
        sans: ['Roboto Mono', 'monospace'], // Usar mono como padrão para manter o tema
      },
      fontSize: {
        'pixel-xs': ['8px', '12px'],
        'pixel-sm': ['10px', '14px'],
        'pixel-base': ['12px', '16px'],
        'pixel-lg': ['14px', '20px'],
        'pixel-xl': ['16px', '24px'],
        'pixel-2xl': ['20px', '28px'],
        'pixel-3xl': ['24px', '32px'],
        'pixel-4xl': ['32px', '40px'],
        'pixel-5xl': ['48px', '56px'],
      },
      spacing: {
        'pixel': '8px',
        'pixel-2': '16px',
        'pixel-3': '24px',
        'pixel-4': '32px',
        'pixel-5': '40px',
        'pixel-6': '48px',
      },
      borderRadius: {
        'pixel': '2px',
        'pixel-lg': '4px',
        'none': '0px',
      },
      boxShadow: {
        'neon-sm': '0 0 5px currentColor',
        'neon': '0 0 10px currentColor',
        'neon-lg': '0 0 20px currentColor',
        'neon-xl': '0 0 30px currentColor',
        'pixel': '2px 2px 0px #333333',
        'pixel-lg': '4px 4px 0px #333333',
        'inset-pixel': 'inset 2px 2px 0px #333333',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 3s linear infinite',
        'scan-line': 'scan-line 2s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
          },
          '100%': { 
            textShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor',
            boxShadow: '0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor',
          },
        },
        'glow': {
          '0%': { 
            boxShadow: '0 0 5px currentColor',
          },
          '100%': { 
            boxShadow: '0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        'flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '1',
          },
          '20%, 24%, 55%': {
            opacity: '0.4',
          },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(45deg, #00ffff, #ff00ff, #00ff00)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0a, #1a1a1a)',
        'circuit-pattern': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300ff00" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      backdropBlur: {
        'pixel': '2px',
      },
    },
  },
  plugins: [],
}

export default config

