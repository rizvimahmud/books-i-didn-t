const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        "accent-1": "#FAFAFB",
        "accent-2": "#F3F4F4",
        "accent-3": "#E8E8E9",
        "accent-4": "#D1D1D3",
        "gray-1": "hsl(0 0% 93.0%)",
        "gray-2": "hsl(0 0% 62.8%)",
        "gray-3": "hsl(0 0% 49.4%)",
        "gray-4": "hsl(0 0% 43.9%)",
        "gray-5": "hsl(0 0% 31.2%)",
        "gray-6": "hsl(0 0% 24.3%)",
        "gray-7": "hsl(0 0% 20.5%)",
        "gray-8": "hsl(0 0% 17.9%)",
        "gray-9": "hsl(0 0% 15.8%)",
        "gray-10": "hsl(0 0% 11.0%)",
      },
    },
  },
  plugins: [],
};
