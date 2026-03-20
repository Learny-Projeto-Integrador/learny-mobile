/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        montserratRegular: ["Montserrat_400Regular"],
        montserratMedium: ["Montserrat_500Medium"],
        montserratSemiBold: ["Montserrat_600SemiBold"],
        montserratBold: ["Montserrat_700Bold"],
        montserratExtraBold: ["Montserrat_800ExtraBold"],
        montserratBlack: ["Montserrat_900Black"],
      },
    },
  },
  plugins: [],
};