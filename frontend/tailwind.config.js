/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0F172A",
        editorBg: "#111827",
        panelBg: "#1E293B",
        accentBlue: "#3B82F6",
        accentSky: "#38BDF8",
        textLight: "#F8FAFC",
      },
    },
  },
  plugins: [],
};