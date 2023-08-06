/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        small: "-1px -1px 37px -8px rgba(0,0,0,0.45)"
      },
      fontFamily: {
        sans: ["PT Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient": "linear-gradient(to top, rgba(0,0,0,0.6) calc(100% - 24px), rgba(0, 0, 0, 0) 100%)"
      }
    },
  },
  plugins: [],
}
