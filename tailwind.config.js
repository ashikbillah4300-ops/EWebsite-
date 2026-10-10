/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        choco: {
          primary:   '#3E2723',
          deep:      '#2B1B18',
          secondary: '#5D4037',
          medium:    '#795548',
          caramel:   '#C49A6C',
          cream:     '#FAF6F0',
          border:    '#E7DED5',
          text:      '#2B211D',
          muted:     '#80736B',
          success:   '#32805A',
          star:      '#E5A33D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        choco: '0 4px 24px rgba(62,39,35,0.10)',
        'choco-lg': '0 8px 40px rgba(62,39,35,0.16)',
      },
    },
  },
  plugins: [],
};
