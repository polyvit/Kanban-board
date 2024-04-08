/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBackgroundColor: "#227E9A",
        columnBackgroundColor: "#52DBE5",
      },
    },
  },
  plugins: [],
};
