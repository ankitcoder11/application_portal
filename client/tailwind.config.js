/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        robot: ['Roboto', 'sans-serif'],
      },
      animation: {
        mobileHeaderOpen: "mobileHeaderOpen 0.5s linear",
        MobileHeaderClose: "MobileHeaderClose 0.6s linear",
      },
      keyframes: {
        mobileHeaderOpen: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "25%": { opacity: "0.4", transform: "translateX(-75%)" },
          "50%": { opacity: "0.5", transform: "translateX(-50%)" },
          "60%": { opacity: "0.6", transform: "translateX(-40%)" },
          "70%": { opacity: "0.7", transform: "translateX(-30%)" },
          "80%": { opacity: "0.8", transform: "translateX(-20%)" },
          "90%": { opacity: "0.9", transform: "translateX(-10%)" },
          "100%": { opacity: "1", transform: "translateX(0%)" },
        },
        MobileHeaderClose: {
          "0%": { opacity: "1", transform: "translateX(0%)" },
          "10%": { opacity: ".9", transform: "translateX(-10%)" },
          "20%": { opacity: ".8", transform: "translateX(-20%)" },
          "30%": { opacity: ".7", transform: "translateX(-30%)" },
          "40%": { opacity: ".6", transform: "translateX(-40%)" },
          "50%": { opacity: ".5", transform: "translateX(-50%)" },
          "60%": { opacity: ".4", transform: "translateX(-60%)" },
          "70%": { opacity: ".3", transform: "translateX(-70%)" },
          "80%": { opacity: ".2", transform: "translateX(-80%)" },
          "100%": { opacity: ".1", transform: "translateX(-100%)" },
        }
      }
    },
  },
  plugins: [],
}