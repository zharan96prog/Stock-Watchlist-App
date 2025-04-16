import { fontFamily } from 'tailwindcss/defaultTheme';

// filepath: /Users/olenazharan/Desktop/React/Stock-Watchlist-App/tailwind.config.js
export default {
  content: [
    './index.html', // Include the root HTML file
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS/JSX/TS/TSX files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1EE3CF',
        'primary-dark': '#109A8D',
        background: '#0D1B1E',
        'primary-foreground': '#E6FFFA',
        border: '#16B3A3',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

// Назва	      Tailwind class	        Значення	Призначення
// primary	    bg-primary	            #1EE3CF	  Акценти, кнопки
// primary-dark	bg-primary-dark	        #109A8D	  Hover-ефекти, темні акценти
// bg	          bg-background	          #0D1B1E	  Фон
// text	        text-primary-foreground	#E6FFFA	  Основний текст на фоні
// border	      border-border	          #16B3A3	  Лінії, розділення
