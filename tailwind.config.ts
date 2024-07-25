import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        '3/10': '30%',
        '7/10': '70%'
      },
      backgroundImage: {
        'instagram-gradient': 'linear-gradient(45deg, #833AB4, #FD1D1D, #F56040)',
        'gradient-45': 'linear-gradient(45deg, var(--tw-gradient-stops))',
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
        'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        // Add more directions as needed
      },
        textFillColor: {
        'transparent': 'transparent',
      },
      backgroundClip: {
        'text': 'text',
      },
      
      colors: {
        "theme-opacity": 'var(--state-theme-opacity)',
        
        "theme": '#213F7D',
        "button": '#5EB839',
        "mute": "#6b7280",
        'label': '#213F7D',
        'danger': '#a62216',
        'dark': "#242a31",
        'warning': "#ca8a04",
        'dark-brown': '#4B2E2A',
        'suspend': '#ea580c',
        'blue': "#0369a1",
        "amber": "#b45309",
        
        'background': '#121212', // Dark background
        'primary-text': '#e0e0e0', // Light gray text
        'secondary-text': '#b0b0b0', // Dim gray text
        'primary-accent': '#bb86fc', // Purple accent
        'secondary-accent': '#03dac6', // Teal accent
        'error-color': '#cf6679', // Red error color
        'card-bg': '#1e1e1e', // Card background
        'border-color': '#2c2c2c', // Border color


      },
      keyframes: {
        'animate-boing': {
          '0%':{
            transform:'scale(0.75)'

          
          },
          '50%':{
            transform:'scale(1.1)'
          },
          '100%':{
            transform:'scale(1)'

          }
        }
      },
      animation: {
        'animate-boing': 'animate-boing 0.7s ease-in  1 forwards'
      }
      

    },

  },
  plugins: [],
};
export default config;
